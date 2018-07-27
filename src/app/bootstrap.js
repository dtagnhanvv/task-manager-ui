window.deferredBootstrapper.bootstrap({
    element: document,
    module: 'biddy',
    injectorModules: ['biddy.core.bootstrap', 'biddy.core.auth'],
    moduleResolves: [
        {
            module: 'biddy.core.bootstrap',
            resolve: {
                EXISTING_SESSION: ['Auth', function (Auth) {
                    return Auth.check().catch(function () {
                        return false;
                    }).finally(function () {
                        console.log('auth resolved');
                    });
                }]
            }
        }
    ]
});