module.exports = {
    dirs: {
        build: {
            dev: 'build/targets/dev',
            prod: 'build/targets/prod',
            prodWhiteLabel: 'build/targets/prod-whitelabel'
        },
        temp: 'build/temp'
    },
    deployment: {
        origin: {
            dev: {
                tagcade: {
                    match: /api\.task\.test/g,
                    val: 'api.task.test',
                    apiEndPoint: 'http://api.task.test/app_dev.php/api'
                },
                unified: {
                    match: /ur-api\.task\.test/g,
                    val: 'ur-api.task.test',
                    apiEndPoint: 'http://ur-api.task.test/app_dev.php/api'
                }
            },
            prod: {
                tagcade: {
                    val: 'api.tagcade.com',
                    apiEndPoint: 'https://api.tagcade.com/api'
                },
                unified: {
                    val: 'ur-api.pubvantage.com',
                    apiEndPoint: 'https://ur-api.pubvantage.com/api'
                }
            },
            prodWhiteLabel: {
                title: {
                    match: /Tagcade Platform/g,
                    replacement: 'Test Platform'
                },
                image: {
                    logo: 'build/images/whitelabel/logo.png',
                    logoHeader: 'build/images/whitelabel/logo-header.png'
                }
            }
        }
    },
    envFiles: {
        js: [
            'src/browserCheck.js'
        ]
    },
    appFiles: {
        js: ['src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js', '!src/app/app.js', '!src/app/bootstrap.js'],
        coreJs: ['src/app/app.js', 'src/app/bootstrap.js'],
        tests: ['src/**/*.spec.js'],
        appTemplates: ['src/app/**/*/*.tpl.html'],
        commonTemplates: ['src/common/**/*/*.tpl.html'],
        scss: ['src/styles/ui/**/*.scss'],
        css: [],
        html: ['src/*.html']
    },
    vendorFiles: {
        js: [
            'vendor/jquery/dist/jquery.min.js',
            'vendor/jquery-slimscroll/jquery.slimscroll.js',
            'vendor/jquery.nicescroll/jquery.nicescroll.min.js',
            'vendor/jquery-ui/jquery-ui.min.js',
            'vendor/angular/angular.js',
            'vendor/angular-deferred-bootstrap/angular-deferred-bootstrap.js',
            'vendor/angular-underscore-module/angular-underscore-module.js',
            'vendor/angular-animate/angular-animate.min.js',
            'vendor/angular-sanitize/angular-sanitize.min.js',
            'vendor/angular-ui-router/release/angular-ui-router.js',
            'vendor/angular-ui-sortable/sortable.min.js',
            'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'vendor/lodash/dist/lodash.min.js',
            'vendor/restangular/dist/restangular.min.js',
            'vendor/moment/min/moment.min.js',
            'vendor/moment/min/locales.min.js',
            'vendor/moment/locale/vi.js',
            'vendor/angular-moment/angular-moment.min.js',
            'vendor/angular-ui-select/dist/select.min.js',
            'vendor/angular-loading-bar/build/loading-bar.min.js',
            'vendor/angular-httpi/lib/httpi.js',
            'vendor/highcharts-release/highcharts.js',
            'vendor/highcharts-ng/dist/highcharts-ng.min.js',
            'vendor/at-table/dist/angular-table.min.js',
            'vendor/angular-currency-filter/dist/currency-filter.min.js',
            'vendor/file-saver/FileSaver.min.js',
            'vendor/angular-xeditable/dist/js/xeditable.js',
            'vendor/codemirror/lib/codemirror.js',
            'vendor/angular-ui-codemirror/ui-codemirror.js',
            'vendor/codemirror/mode/xml/xml.js',
            'vendor/codemirror/mode/css/css.js',
            'vendor/codemirror/mode/javascript/javascript.js',
            'vendor/codemirror/mode/htmlmixed/htmlmixed.js',
            'vendor/angular-highlightjs/src/angular-highlightjs.js',
            'vendor/highlightjs/highlight.pack.js',
            'vendor/zeroclipboard/dist/ZeroClipboard.min.js',
            'vendor/ng-clip/src/ngClip.js',
            'vendor/jsondiffpatch/public/build/jsondiffpatch.js',
            'vendor/angularjs-dropdown-multiselect/src/angularjs-dropdown-multiselect.js',
            'vendor/isteven-angular-multiselect/isteven-multi-select.js',
            'vendor/angular-cache/dist/angular-cache.js',
            'vendor/angular-translate/angular-translate.js',
            'vendor/oi.select/dist/select-tpls.min.js',
            'vendor/ngInfiniteScroll/build/ng-infinite-scroll.min.js',
            'vendor/angular-file-upload/dist/angular-file-upload.min.js',
            'vendor/ment.io/dist/mentio.min.js',
            'vendor/angular-bootstrap-slider/slider.js',
            'vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.js',
            'node_modules/froala-editor/js/froala_editor.pkgd.min.js',
            'node_modules/froala-editor/js/languages/vi.js',
            'assets/_3rd-party/angular-froala/angular-froala.js',
            'assets/_3rd-party/face-emoji/js/faceMocion.js',
            'vendor/awesome-rating/dist/awesomeRating.angular.js',
            'vendor/ngmap/build/scripts/ng-map.min.js',
            'vendor/angular-daterangepicker/js/angular-daterangepicker.min.js',
            'vendor/bootstrap-daterangepicker/daterangepicker.js',
            'vendor/utatti-perfect-scrollbar/dist/perfect-scrollbar.min.js',
            'vendor/angular-perfect-scrollbar/src/angular-perfect-scrollbar.min.js',
            'vendor/angular-ui-notification/dist/angular-ui-notification.min.js',
            'vendor/sweetalert2/dist/sweetalert2.all.min.js',
            'vendor/swangular/swangular.js'
        ],
        css: [
            'src/styles/customvendor/**/*.css',
            'node_modules/froala-editor/css/froala_style.css',
            'node_modules/froala-editor/css/froala_editor.pkgd.css',
            'assets/_3rd-party/face-emoji/css/faceMocion.css',
            'vendor/awesome-rating/dist/awesomeRating.css',
            'vendor/bootstrap-daterangepicker/daterangepicker.css',
            'vendor/utatti-perfect-scrollbar/css/perfect-scrollbar.css',
            'vendor/angular-ui-notification/dist/angular-ui-notification.min.css',
            'vendor/sweetalert2/dist/sweetalert2.min.css'
        ],
        swf: [
            'vendor/zeroclipboard/dist/ZeroClipboard.swf'
        ]
    }
};