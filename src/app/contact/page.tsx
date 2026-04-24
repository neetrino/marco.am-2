'use client';

import { Button, Input } from '@shop/ui';
import { MapPin } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useTranslation } from '../../lib/i18n-client';
import {
  getContactLocations,
  mapsEmbedUrlForLocation,
  parseContactLocationHash,
  type ContactLocation,
  type ContactLocationId,
} from '../../lib/contact-locations';
import { apiClient } from '../../lib/api-client';
import { getErrorMessage } from '@/lib/types/errors';
import {
  FOOTER_CONTACT_MAIL_ICON_SRC,
  FOOTER_CONTACT_PHONE_ICON_SRC,
} from '../../components/footer-social.constants';

const CONTACT_PAGE_PHONE_ICON_CLASS =
  'mt-0.5 h-[13px] w-auto shrink-0 translate-y-[4px]';
const CONTACT_PAGE_MAIL_ICON_CLASS =
  'mt-0.5 h-[12px] w-auto shrink-0 translate-y-[3px]';
/** Ровные разделители контактных блоков: первые одинаковые, последний короче. */
const CONTACT_DIVIDER_BASE_CLASS = 'ml-0 block h-px shrink-0 self-start bg-black/15 dark:bg-white/40';
const CONTACT_DIVIDER_CLASS =
  `${CONTACT_DIVIDER_BASE_CLASS} w-[17.5rem] sm:w-[20rem]`;
const CONTACT_EMAILS = ['marcogrouparmenia@mail.ru', 'marcofurniture@mail.ru'] as const;

type ContactMapAddressStripProps = {
  locations: readonly ContactLocation[];
  activeId: ContactLocationId;
  onSelect: (id: ContactLocationId) => void;
  sectionTitle: string;
};

function ContactMapAddressStrip({
  locations,
  activeId,
  onSelect,
  sectionTitle,
}: ContactMapAddressStripProps) {
  return (
    <div className="border-b border-black/10 bg-white px-4 py-5 dark:border-white/10 dark:bg-[var(--app-bg)] sm:px-6">
      <div className="marco-header-container">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.08em] text-marco-text/70 dark:text-white/55">
          {sectionTitle}
        </p>
        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          role="tablist"
          aria-label={sectionTitle}
        >
          {locations.map((loc) => {
            const active = activeId === loc.id;
            return (
              <button
                key={loc.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelect(loc.id)}
                className={`flex min-h-[3.25rem] items-start gap-2.5 rounded-2xl border px-4 py-3 text-left text-sm font-medium leading-snug transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marco-yellow/80 sm:text-[15px] ${
                  active
                    ? 'border-marco-yellow bg-marco-yellow/12 text-marco-black shadow-sm ring-1 ring-marco-yellow/35 dark:bg-marco-yellow/14 dark:text-white dark:ring-marco-yellow/45'
                    : 'border-gray-200/90 bg-white/90 text-marco-text hover:border-marco-yellow/45 hover:bg-marco-yellow/[0.06] hover:shadow-sm dark:border-white/12 dark:bg-white/[0.04] dark:text-white/88 dark:hover:border-marco-yellow/40 dark:hover:bg-marco-yellow/[0.08]'
                }`}
              >
                <MapPin
                  className={`mt-0.5 h-[18px] w-[18px] shrink-0 stroke-[2] ${
                    active ? 'text-marco-yellow' : 'text-marco-text/45 dark:text-white/45'
                  }`}
                  aria-hidden
                />
                <span className="min-w-0 flex-1">{loc.address}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { t, lang } = useTranslation();
  const contactLocations = useMemo(() => getContactLocations(lang), [lang]);
  const [mapFocusId, setMapFocusId] = useState<ContactLocationId | null>(null);
  const mapSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncFromHash = () => {
      setMapFocusId(parseContactLocationHash(window.location.hash));
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  useEffect(() => {
    if (!parseContactLocationHash(window.location.hash)) {
      return;
    }
    const el = mapSectionRef.current;
    if (!el) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const headerOffset = 88;
    const visibleEnough =
      rect.top >= headerOffset - 32 && rect.top < window.innerHeight * 0.92;
    if (visibleEnough) {
      return;
    }
    const timer = window.setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [mapFocusId]);

  const mapLocation =
    (mapFocusId ? contactLocations.find((l) => l.id === mapFocusId) : null) ??
    contactLocations[0];

  const activeMapId: ContactLocationId =
    mapFocusId ?? contactLocations[0]?.id ?? 'yerevan';

  const selectMapLocation = (id: ContactLocationId) => {
    window.location.hash = `loc-${id}`;
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await apiClient.post('/api/v1/contact', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }, {
        skipAuth: true, // Contact form doesn't require authentication
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      alert(t('contact.form.submitSuccess') || 'Ձեր հաղորդագրությունը հաջողությամբ ուղարկվեց');
    } catch (error: unknown) {
      console.error('Error submitting contact form:', error);
      alert(t('contact.form.submitError') || 'Սխալ: ' + (getErrorMessage(error) || 'Չհաջողվեց ուղարկել հաղորդագրությունը'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white">
      {/* Top Section: Contact Info and Form */}
      <div className="marco-header-container pt-12 pb-16">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(320px,380px)_minmax(320px,380px)] md:justify-center md:items-center md:gap-8 lg:grid-cols-[420px_420px] lg:gap-12">
          {/* Left Side: Contact Information */}
          <div className="flex w-full flex-col items-center self-start space-y-3.5 md:items-start">
            <h2 className="mb-8 w-full self-start text-3xl font-bold text-gray-900 lg:-ml-[181px]">
              {t('contact.pageTitle')}
            </h2>
            <div className="mx-auto w-fit max-w-[320px] self-center sm:max-w-[340px] md:mx-0 md:w-full md:self-auto">
              {contactLocations.map((location, idx) => (
                <div
                  key={location.address}
                  id={`contact-loc-${location.id}`}
                  className={`space-y-2 rounded-lg px-2 py-1 transition-colors ${idx === contactLocations.length - 1 ? 'pb-0' : 'pb-4'} ${
                    mapFocusId !== null && mapFocusId === location.id
                      ? 'bg-black/[0.04] dark:bg-white/[0.06]'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <MapPin
                      className={`mt-0.5 h-[18px] w-[18px] shrink-0 text-marco-yellow ${
                        idx === 0 ? 'translate-y-[3px]' : 'translate-y-[2px]'
                      }`}
                      strokeWidth={2}
                      aria-hidden
                    />
                    <p className="text-sm font-medium leading-snug text-marco-black sm:text-base">
                      {location.address}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <img
                      src={FOOTER_CONTACT_PHONE_ICON_SRC}
                      alt=""
                      width={16}
                      height={13}
                      className={CONTACT_PAGE_PHONE_ICON_CLASS}
                      aria-hidden
                    />
                    <div className="flex flex-col gap-px">
                      {location.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/[^\d+]/gu, '')}`}
                          className="text-sm font-semibold leading-snug text-marco-black transition-opacity hover:opacity-80 sm:text-base"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                  {idx < contactLocations.length - 1 && (
                    <div className={CONTACT_DIVIDER_CLASS} aria-hidden />
                  )}
                </div>
              ))}
              <div className={`${CONTACT_DIVIDER_CLASS} mt-2`} aria-hidden />
              <div className="space-y-2.5 pt-6">
                {CONTACT_EMAILS.map((email) => (
                  <div key={email} className="flex items-start gap-2">
                    <img
                      src={FOOTER_CONTACT_MAIL_ICON_SRC}
                      alt=""
                      width={18}
                      height={14}
                      className={CONTACT_PAGE_MAIL_ICON_CLASS}
                      aria-hidden
                    />
                    <a
                      href={`mailto:${email}`}
                      className="break-all text-xs font-semibold leading-snug text-marco-black transition-opacity hover:opacity-80 sm:text-sm"
                    >
                      {email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form — ниже и по центру колонки относительно блока «ԿԱՊ ՄԵԶ ՀԵՏ» */}
          <div className="flex w-full max-w-[420px] flex-col items-center self-center justify-self-center lg:translate-y-[40px]">
            <form
              onSubmit={handleSubmit}
              className="mx-auto w-full max-w-[420px] space-y-2.5"
            >
              <div>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  aria-label={t('contact.form.name')}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full !h-10 !rounded-full !border-transparent !bg-[#efefef] !px-4 !py-0 !text-sm !text-marco-black placeholder:!text-[#8f8f8f] focus:!ring-2 focus:!ring-[#d4d4d4] sm:!text-base"
                  placeholder={t('contact.form.name').replace(/\*/gu, '').trim()}
                />
              </div>
              <div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  aria-label={t('contact.form.email')}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full !h-10 !rounded-full !border-transparent !bg-[#efefef] !px-4 !py-0 !text-sm !text-marco-black placeholder:!text-[#8f8f8f] focus:!ring-2 focus:!ring-[#d4d4d4] sm:!text-base"
                  placeholder={t('contact.form.email').replace(/\*/gu, '').trim()}
                />
              </div>
              <div>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  aria-label={t('contact.form.subject')}
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full !h-10 !rounded-full !border-transparent !bg-[#efefef] !px-4 !py-0 !text-sm !text-marco-black placeholder:!text-[#8f8f8f] focus:!ring-2 focus:!ring-[#d4d4d4] sm:!text-base"
                  placeholder={t('contact.form.subject').replace(/\*/gu, '').trim()}
                />
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  aria-label={t('contact.form.message')}
                  className="w-full min-h-[108px] resize-none !rounded-[20px] !border-transparent !bg-[#efefef] !px-4 !py-2.5 !text-sm !text-marco-black dark:!text-[#050505] placeholder:!text-[#8f8f8f] focus:!outline-none focus:!ring-2 focus:!ring-[#d4d4d4] sm:!text-base"
                  placeholder={t('contact.form.message')}
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                className="w-full !h-10 !rounded-full !border-0 !bg-marco-yellow !py-0 text-sm font-semibold uppercase tracking-wide !text-[#050505] dark:!text-[#050505] hover:!brightness-95 focus:!ring-marco-black sm:!text-base"
                disabled={submitting}
              >
                {submitting ? (t('contact.form.submitting') || 'Ուղարկվում է...') : t('contact.form.submit')}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom: address chips + map — /contact#loc-{id} syncs with header deep links */}
      <div
        ref={mapSectionRef}
        id="contact-page-map"
        className="w-full scroll-mt-24 bg-gray-100 dark:bg-black/20"
      >
        <ContactMapAddressStrip
          locations={contactLocations}
          activeId={activeMapId}
          onSelect={selectMapLocation}
          sectionTitle={t('contact.mapSectionTitle')}
        />
        <div className="h-[min(480px,62vh)] min-h-[300px] w-full">
          {mapLocation ? (
            <iframe
              key={mapLocation.id}
              title={mapLocation.address}
              src={mapsEmbedUrlForLocation(mapLocation)}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
