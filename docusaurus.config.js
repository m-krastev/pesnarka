// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const {indexedSort} = require('./src/js')

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Песнарка',
    tagline: 'Християнски песни за хваление и поклонение',
    url: 'https://pesnarka.propovedi.org',
    baseUrl: '/pesnarka/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/logo_propovedi.png',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    //   organizationName: 'facebook', // Usually your GitHub org/user name.
    //   projectName: 'docusaurus', // Usually your repo name.

    // Even if you don't use internationalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'bg',
        locales: ['bg'],
        localeConfigs:{
            bg:{
                htmlLang: 'bg-BG'
            }
        }
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: '/',
                    sidebarPath: require.resolve('./sidebars.js'),
                
                    async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
                        const sidebarItems = await defaultSidebarItemsGenerator(args);
                        return indexedSort(sidebarItems);
                    },

                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    //   editUrl:
                    //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                blog: false,
                // {
                //   // showReadingTime: true,
                //   // // Please change this to your repo.
                //   // // Remove this to remove the "edit this page" links.
                //   // editUrl:
                //   //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                // },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),

        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            metadata: [
                {
                    name: 'keywords',
                    content: 'песни, духовни, песни, духовни песни, поклонение, песнарка, християнин, християни, християнски песни, дух, душа, християнство, евангелски песни'
                },
                {
                    name: 'description',
                    content: 'Евангелски песни за хваление и поклонение.'
                },
                {
                    name: 'robots',
                    content: 'index,follow'
                }
            ],
            navbar: {
                title: 'Песнарка',
                // logo: {
                //   alt: 'My Site Logo',
                //   src: 'img/logo.svg',
                // },
                hideOnScroll: true,
                items: [
                    // ALPHASORT: Add this once you're smarter KEK
                    // BUG: On mobile, the button appears next to logo text rather than side menu
                    // {
                    //     type: 'custom-SortSidebarButton',
                    //     position: 'left',
                    // },
                    //   {
                    //     type: 'doc',
                    //     docId: '1',
                    //     position: 'left',
                    //     label: 'Песни',
                    //   },
                    {
                        href: 'https://propovedi.org/',
                        label: 'ProPoVedi',
                        position: 'right',
                    },
                    {
                        href: 'https://pesni.propovedi.org/',
                        label: 'Нови песни',
                        position: 'right',
                    },
                ],
            },

            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },

            zoom: {
                selector: 'img',
                // Optional medium-zoom options
                // see: https://www.npmjs.com/package/medium-zoom#options
                options: {
                    margin: 0,
                    background: '#FFF',
                    scrollOffset: 700,
                    container: '#zoom-container',
                    template: '#zoom-template',
                },
            },
        }),
    plugins: [
        // Load font settings from local storage
        async function loadFontSettings(context, options) {
            return {
                name: 'load-font-settings',
                injectHtmlTags({ content }) {
                    return {
                        preBodyTags: [
                            {
                                tagName: 'script',
                                innerHTML: `const doc = document.querySelector(":root");
                                const storage = window.localStorage;
                                doc.style.setProperty("--custom-line-height", storage.getItem("lineHeight"));
                                doc.style.setProperty("--custom-font-weight",storage.getItem("fontWeight"));
                                doc.style.setProperty("--custom-font-factor",storage.getItem("fontSizeFactor"));`
                            }
                        ]
                    }
                }

            }
        },

        require.resolve("docusaurus-plugin-image-zoom"),

//         async function getSortPreferences(context,options){
//             return{
//                 name: 'get-sort-preferences',
//                 injectHtmlTags({content}){
//                     return {
//                         postBodyTags: {
//                             attributes: {defer:true},
//                             tagName: 'script',
//                             innerHTML: `const alphaSort = JSON.parse(window.localStorage.getItem('sort')) ?? false;
// if (alphaSort === true) {
//     let sidebar_ul = document.querySelector('ul.theme-doc-sidebar-menu')
//     const sidebar = [...sidebar_ul.children]

//     sidebar.sort((a, b) =>
//         a.innerText.includes('.') && b.innerText.includes('.') 
//         ? (a.innerText.split('.')[1].trim()).localeCompare(b.innerText.split('.')[1].trim()) 
//         : 0)

//     sidebar_ul.innerHTML = ""

//     sidebar.forEach((el) => sidebar_ul.append(el))

// }`
//                         }
//                     }
//                 }
//             }
//         }

    ],
    themes: [
        [
            // The search is implemented as a theme rather than plugin.
            require.resolve("@easyops-cn/docusaurus-search-local"),
            {
                // ... Your options.
                // `hashed` is recommended as long-term-cache of index file is possible.
                indexBlog: false,
                docsRouteBasePath: '/',
                hashed: true,
                // Selecting Russian as there is no Bulgarian.
                language: ["ru"],
                highlightSearchTermsOnTargetPage: false,
            },
        ]
    ],
};

module.exports = config;
