1. Նպատակ

Այս փաստաթղթի նպատակը սահմանել է, թե ինչպես պետք է Cursor agent-ը միանա Figma-ին, կարդա դիզայնը ճիշտ, և այն վերածի իրական, production-quality UI-ի առանց ինքնագործունեության, ինքնակամ redesign-ի կամ Figma-ից շեղումների։

Այս workflow-ը հիմնված է Figma MCP server-ի և Cursor-ի MCP/plugin support-ի վրա։ Figma-ի official MCP server-ը Cursor-ին տալիս է դիզայնի context, frame/layer access, variables/styles և այլ անհրաժեշտ տվյալներ, իսկ Cursor-ը կարող է այդ context-ը օգտագործել իրական կոդ գեներացնելու համար։ Figma-ն նաև պաշտոնապես խորհուրդ է տալիս Cursor-ի համար Figma plugin/MCP integration օգտագործել, իսկ selection-based prompting-ը լիարժեք աշխատում է desktop MCP server-ով, մինչդեռ remote server-ը պահանջում է frame կամ layer link։

2. Նախապայմաններ

Cursor agent-ը Figma-ի հետ ճիշտ աշխատելու համար պետք է ապահովված լինեն հետևյալ պայմանները.

Պարտադիր
Cursor-ում պետք է միացված լինի MCP support-ը։ Cursor-ը պաշտոնապես աջակցում է MCP servers-ին։
Figma MCP server-ը պետք է միացված լինի Cursor-ին։
Ամենահարմար տարբերակը Cursor-ի մեջ Figma plugin-ը ավելացնելն է /add-plugin figma հրամանով, որովհետև այդ plugin-ը ներառում է MCP server config, skills և rules Figma-based workflows-ի համար։
Եթե օգտագործվում է desktop server, Cursor-ում MCP server-ը կարող է կապվել local URL-ով http://127.0.0.1:3845/mcp configuration-ով, ինչպես ցույց է տրված Figma-ի developer docs-ում։
Figma account-ը պետք է ունենա համապատասխան access. Figma-ի plan/seat-ից կախված MCP usage limits կան. Starter կամ View/Collab seat-երի համար սահմանափակումները շատ փոքր են, իսկ Pro/Organization/Enterprise + Full/Dev seats-ի դեպքում tool call limit-երը ավելի բարձր են։
Խորհուրդ տրվող
Օգտագործել Figma Dev Mode / Code Connect, եթե project-ում կան արդեն կապակցված design components ↔ code components mappings։ Դա agent-ին օգնում է ոչ թե նորից բան հորինել, այլ reuse անել ճիշտ component-ները։
Ամեն փոփոխությունից առաջ ունենալ կոնկրետ Figma frame/link կամ selection, ոչ թե “մտի Figma ու հասկացիր ինչ եմ ուզում” տիպի մարդկային քաոս։
3. Ինչպես միացնել Figma-ն Cursor-ին
Տարբերակ A. Առաջարկվող

Cursor agent chat-ում ավելացնել Figma plugin.

/add-plugin figma

Սա preferred setup-ն է Cursor-ի համար, որովհետև plugin-ը բերում է.

MCP server configuration
Figma skills
asset handling rules
design-to-code workflow hints
Տարբերակ B. Desktop MCP server

Եթե օգտագործում ես local/desktop setup, Cursor-ի MCP settings-ում ավելացրու Figma desktop server-ը.

Օրինակ config.

{
  "mcpServers": {
    "figma-desktop": {
      "url": "http://127.0.0.1:3845/mcp"
    }
  }
}

Այս ձևաչափը տրված է Figma-ի official desktop server installation docs-ում Cursor-ի համար։

4. Ինչ պետք է կարողանա անել Cursor agent-ը Figma-ի հետ

Cursor agent-ը Figma-ից պետք է ոչ թե “նայելով մոտավոր սարքի”, այլ համակարգված ձևով ստանա հետևյալները.

Պետք է կարդա
frame / section structure
layer hierarchy
typography
spacing
sizing
auto-layout behavior
colors, variables, styles
components / instances
states
images/assets
Code Connect mappings, եթե կան
Պետք է հասկանա
ինչը reusable component է
ինչը մեկանգամյա layout է
որտեղ է absolute positioning
որտեղ է auto-layout
responsive behavior կա, թե ոչ
interactive states կան, թե static է
component variant-ներ կան, թե ոչ
Պետք է անի
իրական կոդ սարքի project-ի stack-ով
reuse անի արդեն եղած UI components-ը
չկոտրի առկա logic-ը
չփոխի design-ը իր ճաշակով
չավելացնի իր կողմից border-radius, spacing, shadows, animation, եթե դրանք Figma-ում չկան
5. Agent-ի հիմնական կանոնները

Սա այն մասն է, որ պետք է դնես որպես պարտադիր rule set Cursor agent-ի համար.

Core rules
Rule 1. Figma is source of truth

Figma-ում տրված layout-ը, spacing-ը, typography-ն, sizes-ը, alignment-ը և visual hierarchy-ն համարվում են ճշմարտության միակ աղբյուրը։ Agent-ը իրավունք չունի փոփոխել դա առանց հստակ հանձնարարության։

Rule 2. No redesign

Agent-ը չի redesign անում, չի “improve” անում, չի “modernize” անում, չի “clean up” անում, եթե դա ուղիղ պահանջված չէ։

Rule 3. Read first, build second

Agent-ը նախ պետք է ամբողջությամբ կարդա Figma context-ը, հետո նոր գրի կոդը։ Երբեք չպետք է անմիջապես սկսի գրել component-ը առանց structure-ը, styles-ը, states-ը հասկանալու։

Rule 4. Reuse project code

Եթե project-ում արդեն կա համապատասխան button, card, modal, input, section wrapper կամ typography system, agent-ը պետք է reuse անի դրանք, ոչ թե ստեղծի նոր duplicate version։

Rule 5. Respect design tokens

Եթե project-ում կան tokens կամ CSS variables կամ Tailwind tokens, agent-ը պետք է օգտագործի հենց դրանք, ոչ թե hardcoded random values։

Rule 6. No invented responsiveness

Եթե Figma-ում mobile/tablet/desktop տարբերակներ չկան, agent-ը չպետք է ինքնուրույն հորինի լրիվ նոր responsive structure։ Կարելի է միայն պահպանել existing hierarchy-ն ու տրամաբանական adaptive behavior տալ։

Rule 7. Images and assets

Agent-ը պետք է ճիշտ հասկանա որ asset-ը image է, որն է icon, որն է background, և դրանք integrate անի ճիշտ ձևով։ Asset handling-ի համար Figma plugin-ը նաև rules է տալիս։

Rule 8. Ask the design, not imagination

Եթե կա ambiguity, agent-ը պետք է փորձի լրացուցիչ context վերցնել Figma-ից, ոչ թե որոշի իր կողմից։

6. Figma կարդալու ճիշտ հերթականություն

Agent-ը պետք է աշխատի այս հաջորդականությամբ.

Step 1. Բացել ճիշտ frame-ը կամ selection-ը
Օգտագործել կոնկրետ Figma link
Եթե remote MCP է, link-ը պարտադիր է frame/layer մակարդակով
Եթե desktop MCP է, selection-based workflow նույնպես կարելի է օգտագործել
Step 2. Հասկանալ structure-ը

Նայել.

parent container
child sections
nesting
grid / auto-layout
fixed / hug / fill behaviors
Step 3. Վերցնել styles / variables

Հասկանալ.

font family
font size
font weight
line height
colors
spacing
border radius
opacity
effects
Step 4. Վերցնել component mappings

Եթե component-ը կապված է code component-ի հետ, պետք է այդ mapping-ը օգտագործել, ոչ թե նորից գրել նույն բանը։ Figma MCP tools-ը և Code Connect-ը հատուկ օգնում են reuse-ի համար։

Step 5. Հասկանալ states-ը

Եթե element-ը ունի hover / active / selected / expanded / disabled state, agent-ը պետք է դա ճանաչի և implement անի։

Step 6. Միայն դրանից հետո գրել կոդը

Կոդը պետք է գրվի project-ի architectural rules-ի սահմաններում։

7. “Լրիվ իրական սարքելու” սահմանումը

“Լրիվ իրական սարքել” նշանակում է.

Visual accuracy
pixel-close spacing
ճիշտ font sizes
ճիշտ hierarchy
ճիշտ alignments
ճիշտ paddings/margins
ճիշտ block widths/heights
ճիշտ image behavior
Functional accuracy
interactive states աշխատում են
tabs/switchers/sliders/forms բացվում են ճիշտ
hover/focus/active states կան, եթե Figma-ում implied են
responsive behavior logical է
layout-ը չի փլվում տարբեր լայնությունների վրա
Code quality
semantic HTML
maintainable components
no duplicated logic
no magic values when tokens exist
no unnecessary wrappers
no broken accessibility basics
Project consistency
match existing stack
match existing naming
match existing design system
match existing component patterns
8. Ինչը agent-ը ՉՊԵՏՔ է անի
Չպետք է իր կողմից փոխի content-ը
Չպետք է տառատեսակ հորինի
Չպետք է spacing-ներ մոտավոր սարքի
Չպետք է “ավելի սիրուն” դարձնելու պատրվակով փոխի layout-ը
Չպետք է desktop-ը կոտրի mobile-ի պատճառով
Չպետք է mobile-ը սարքի desktop logic-ը ջարդելով
Չպետք է hardcode անի ամեն ինչ, եթե project-ում արդեն կա token system
Չպետք է ignore անի nested components-ը
Չպետք է screenshot-ից միայն աչքով copy անի, եթե design data հասանելի է MCP-ով
9. Recommended agent workflow inside Cursor

Սա արդեն Cursor agent-ի համար գործնական ընթացակարգ է.

Workflow
Read the Figma frame or selection through the Figma MCP tools.
Extract layout, spacing, typography, variables, and component structure.
Check whether the project already has reusable components matching the design.
Reuse existing components and design tokens whenever possible.
Implement the UI as close to Figma as possible.
Preserve existing logic and architecture.
Do not redesign anything unless explicitly instructed.
Verify the final result against the Figma source before finishing.
10. Prompt template Cursor agent-ի համար

Սա կարող ես ուղիղ տալ Cursor-ին.

Use Figma as the single source of truth for this task.

Your job is to read the provided Figma design through the Figma MCP integration and implement it as real production-quality code inside this project.

Strict rules:
- Do not redesign anything.
- Do not improvise spacing, sizing, colors, typography, or hierarchy.
- Read the Figma structure first, then implement.
- Reuse existing project components, utilities, and design tokens wherever possible.
- If a matching component already exists in the codebase, adapt and reuse it instead of creating a duplicate.
- Preserve the current project architecture and logic.
- Do not break desktop while fixing mobile, and do not break existing behavior while implementing the design.
- Follow the Figma frame, layer hierarchy, auto-layout, variables, styles, and component structure as precisely as possible.
- Implement all visible states that are present or clearly implied by the design.
- Keep the result pixel-close to Figma.

Required workflow:
1. Read the Figma frame/selection carefully.
2. Extract layout, spacing, typography, colors, variables, components, and states.
3. Inspect the codebase for reusable components and tokens.
4. Build the UI with clean, maintainable, production-grade code.
5. Compare the final implementation against Figma and fix mismatches.

Do not stop at an approximate result.
The final implementation must look and behave like the Figma design in a real working UI.
11. Ավելի խիստ տարբերակ, եթե ուզում ես agent-ը շատ կարգապահ աշխատի
You must not guess.

If something is available from Figma through MCP, use that information instead of making assumptions.

Priority order:
1. Figma MCP data
2. Existing project components and tokens
3. Minimal necessary inference only when the design does not specify something

Never apply personal design judgment.
Never “improve” the design.
Never change layout structure without explicit instruction.

The output must be implementation-accurate, visually accurate, and codebase-consistent.
12. Լավագույն պրակտիկա
Ամեն task-ի համար տուր կոնկրետ Figma link
Եթե section-specific task է, տուր հենց frame/link-ը, ոչ ամբողջ file-ը
Եթե desktop-only կամ mobile-only task է, դա նշիր առանձին
Եթե project-ում կան rules/docs, ասա agent-ին սկզբում կարդա դրանք
Եթե կան locked pages կամ locked sections, նշիր հստակ
Եթե ուզում ես 100% close result, գրիր “do not approximate”
13. Կարևոր սահմանափակումներ

Figma MCP usage-ը կախված է plan/seat-ից, և usage limits կան, այնպես որ եթե agent-ը սկսում է “tool limit” կամ rate-limit խնդիր տալ, դա կարող է կապված լինել Figma plan-ի հետ, ոչ թե նրա հետ, որ աշխարհը հերթական անգամ փչացավ։ Starter/View/Collab մակարդակներում limit-երը շատ ցածր են, իսկ Full/Dev seat-երով ավելի նորմալ են։

14. Կարճ summary

Եթե ուզում ես, որ Cursor agent-ը Figma-ից ճիշտ սարքի.

միացրու Figma plugin կամ MCP server Cursor-ում
տուր կոնկրետ Figma link/frame
պարտադրիր, որ Figma-ն լինի source of truth
պարտադրիր, որ նախ կարդա, հետո նոր գրի
պարտադրիր reuse անել project-ի components/tokens
արգելիր redesign, improvise, random spacing, random responsiveness

Հենց սա է իրական workflow-ը, ոչ թե “տես նկարը ու սարքի նման մի բան” դպրոցական տառապանքը։