(function () {
    'use strict';

    angular.module('biddy.userPreference')
        .controller('JobCtrl', JobCtrl)
    ;

    function JobCtrl($scope, $translate) {
        const JOB_TITLE = [
            'Nhân viên kinh doanh',
            'Kế toán-Kiểm toán',
            'Hành chính-Văn phòng',
            'Bán hàng',
            'Marketing-PR',
            'Tư vấn',
            'Xây dựng',
            'KD bất động sản',
            'IT phần mềm',
            'Điện-Điện tử-Điện lạnh',
            'Cơ khí-Chế tạo',
            'Biên-Phiên dịch',
            'Nhân sự',
            'Y tế-Dược',
            'Kỹ thuật',
            'Kiến trúc-TK nội thất',
            'Giáo dục-Đào tạo',
            'Ngoại thương-Xuất nhập khẩu',
            'Thư ký-Trợ lý',
            'Dịch vụ',
            'Khách sạn-Nhà hàng',
            'Ngân hàng',
            'Thiết kế-Mỹ thuật',
            'Kho vận-Vật tư',
            'IT phần cứng/mạng',
            'Quản trị kinh doanh',
            'Dệt may - Da giày',
            'Bảo hiểm',
            'Thiết kế đồ hoạ web',
            'Điện tử viễn thông',
            'Thương mại điện tử',
            'Kỹ thuật ứng dụng',
            'Du lịch',
            'Vận tải',
            'Pháp lý-Luật',
            'Báo chí-Truyền hình',
            'Ô tô - Xe máy',
            'Tiếp thị-Quảng cáo',
            'Thời trang',
            'Hoá học-Sinh học',
            'Ngành nghề khác',
            'Tài chính-Đầu tư',
            'Thực phẩm-Đồ uống',
            'Công nghiệp',
            'In ấn-Xuất bản',
            'Spa-Mỹ phẩm-Trang sức',
            'Nông-Lâm-Ngư nghiệp',
            'Hoạch định-Dự án',
            'Tổ chức sự kiện-Quà tặng',
            'Dầu khí-Hóa chất',
            'Quan hệ đối ngoại',
            'An ninh-Bảo vệ',
            'Bưu chính',
            'Nghệ thuật - Điện ảnh',
            'Công nghệ cao',
            'Hàng không',
            'Chứng khoán- Vàng',
            'Hàng gia dụng',
            'Hàng hải',
            'Game',
            'Thủ công mỹ nghệ'

        ];

        $scope.JOBS = _initJobs();
        console.log($scope.JOBS);


        $scope.jobData = $scope.jobData ? $scope.jobData : {
            jobs: angular.copy($scope.JOBS),
        };

        function _initJobs() {
            var jobs = [];
            angular.forEach(JOB_TITLE, function (job) {
                const json = {
                    label: job,
                    key: job,
                    checked: false
                };
                jobs.push(json);
            });

            return jobs;
        }
    }
})();