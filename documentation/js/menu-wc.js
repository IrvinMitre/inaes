'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">social documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-eb31628b3579640273ca7814e052befa"' : 'data-target="#xs-components-links-module-AppModule-eb31628b3579640273ca7814e052befa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-eb31628b3579640273ca7814e052befa"' :
                                            'id="xs-components-links-module-AppModule-eb31628b3579640273ca7814e052befa"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link">DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardModule-4c08d0272abc2913ee2b1cc930d99bbe"' : 'data-target="#xs-components-links-module-DashboardModule-4c08d0272abc2913ee2b1cc930d99bbe"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-4c08d0272abc2913ee2b1cc930d99bbe"' :
                                            'id="xs-components-links-module-DashboardModule-4c08d0272abc2913ee2b1cc930d99bbe"' }>
                                            <li class="link">
                                                <a href="components/AddressComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddressComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductsDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductsDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ServicesDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ServicesDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StoresComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StoresComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardRoutingModule.html" data-type="entity-link">DashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PagesModule.html" data-type="entity-link">PagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PagesModule-47927f1494fd7a64e397c8948642e0be"' : 'data-target="#xs-components-links-module-PagesModule-47927f1494fd7a64e397c8948642e0be"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PagesModule-47927f1494fd7a64e397c8948642e0be"' :
                                            'id="xs-components-links-module-PagesModule-47927f1494fd7a64e397c8948642e0be"' }>
                                            <li class="link">
                                                <a href="components/BusinessComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BusinessComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DestinationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DestinationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GoodsAndServicesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GoodsAndServicesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InformationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InformationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalDialog2.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalDialog2</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalDialog3.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalDialog3</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalDialog4.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalDialog4</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductCategoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegistryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegistryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TourismCategoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TourismCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TourismComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TourismComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WelcomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WelcomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductRoutingModule.html" data-type="entity-link">ProductRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link">ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProductsModule-f7d3e0ec14a7efd6316e0d827a494a7e"' : 'data-target="#xs-components-links-module-ProductsModule-f7d3e0ec14a7efd6316e0d827a494a7e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProductsModule-f7d3e0ec14a7efd6316e0d827a494a7e"' :
                                            'id="xs-components-links-module-ProductsModule-f7d3e0ec14a7efd6316e0d827a494a7e"' }>
                                            <li class="link">
                                                <a href="components/ModalDialog.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalDialog</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductDescriptionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductDescriptionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductPathComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductPathComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductPayComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductPayComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductPhotoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductPhotoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ServiciosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ServiciosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SteperComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SteperComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ProductModel.html" data-type="entity-link">ProductModel</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DirectoryService.html" data-type="entity-link">DirectoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductEffects.html" data-type="entity-link">ProductEffects</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Branch.html" data-type="entity-link">Branch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CatalogClass.html" data-type="entity-link">CatalogClass</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EconomicSector.html" data-type="entity-link">EconomicSector</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Macrosector.html" data-type="entity-link">Macrosector</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product.html" data-type="entity-link">Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductState.html" data-type="entity-link">ProductState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State.html" data-type="entity-link">State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/subsector.html" data-type="entity-link">subsector</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});