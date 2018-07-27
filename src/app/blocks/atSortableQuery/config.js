(function () {
    'use strict';

    angular.module('biddy.blocks.atSortableQuery')
        .constant('COLUMN_HEADER_TO_QUERY_PARAM_MAP',
            {account: 'account.username', site: 'site.name'}
        )
        .constant('QUERY_PARAM_TO_HEADER_MAP', {'account.username':'account', 'site.name': 'site'})
        .constant('EVENT_ACTION_SORTABLE', 'action_sortable')
    ;
})();