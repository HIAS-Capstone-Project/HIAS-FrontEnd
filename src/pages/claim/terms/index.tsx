import { Card, Space, Typography } from 'antd';

const { Title } = Typography;

const Term = () => {
  return (
    <Space>
      <Card style={{ minHeight: '70vh' }} bordered={false}>
        <Title level={2}>Điều khoản và điều kiện</Title>
        <Title level={5}>
          Khi nộp hồ sơ yêu cầu giải quyết quyền lợi bảo hiểm
          (&ldquo;QLBH&rdquo;) thông qua trang điện tử này, Tôi Hiểu và Đồng ý
          rằng:
        </Title>
        <Space style={{ paddingRight: '30px' }}>
          <ol className="list-term">
            <li>
              Tôi xác nhận Tôi là Bên mua bảo hiểm của Hợp đồng, hoặc là người
              được Bên mua bảo hiểm ủy quyền, cung cấp các thông tin của Bên mua
              bảo hiểm và Người được hưởng bảo hiểm để thực hiện yêu cầu giải
              quyết QLBH.
            </li>
            <li>
              Bộ phận xác minh được ủy quyền thực hiện xử lý yêu cầu giải quyết
              QLBH cho Khách hàng của HIAS. Và việc xử lý yêu cầu giải quyết
              QLBH là một phần của Quy trình giải quyết quyền lợi bảo hiểm theo
              quy định của HIAS.
            </li>
            <li>
              Tôi cam kết rằng tất cả thông tin để yêu cầu giải quyết QLBH là
              đầy đủ, đúng sự thật và chịu trách nhiệm về tính chính xác của các
              thông tin cung cấp.
            </li>
            <li>
              Trong trường hợp bộ phận xác minh cần thu thập bản gốc của các
              chứng từ để phục vụ cho yêu cầu giải quyết QLBH, bộ phận xác minh
              sẽ thông báo bẳng văn bản thông qua hộp thư điện tử/ số điện thoại
              mà Tôi đã đăng ký với HIAS. Trường hợp Tôi không thể cung cấp
              chứng từ hoặc cung cấp sai sự thật, quyền lợi bảo hiểm được yêu
              cầu có thể không được xử lý và/hoặc từ chối giải quyết.
            </li>
            <li>
              Ủy quyền cho HIAS, bộ phận xác minh có quyền liên hệ các Cơ sở y
              tế(Bệnh viện, Trung tâm y tế, Phòng khám...), bác sĩ hay tất cả cá
              nhân, cơ quan tổ chức có liên quan để tìm hiểu về quá trình khám,
              điều trị, thông tin sức khỏe của Người được bảo hiểm, nhằm phục vụ
              quá trình giải quyết QLBH.
            </li>
            <li>
              Việc HIAS hoàn tất thủ tục chuyển tiền/thanh toán theo thư thông
              báo giải quyết QLBH được xem là HIAS đã thanh toán đầy đủ và hoàn
              thành trách nhiệm đối với việc giải quyết QLBH được kê khai ở
              Phiếu yêu cầu giải quyết QLBH này, và Tôi cam kết không có bất kỳ
              khiếu nại gì đối với HIAS về sau.
            </li>
            <li>
              Cho phép HIAS được chuyển giao thông tin cá nhân do Bên mua bảo
              hiểm/Người được bảo hiểm cung cấp, cũng như các giao dịch liên
              quan đến Hợp Đồng Bảo Hiểm mà HIAS có được cho bên thứ ba với mục
              đích giải quyết chi trả quyền lợi bảo hiểm, phòng chống trục lợi
              bảo hiểm, nghiên cứu, đánh giá tình hình tài chính, khả năng thanh
              toán, mức độ đầy đủ vốn, yêu cầu vốn, xử lý và quản trị cơ sở dữ
              liệu. Việc cho phép chia sẻ thông tin này sẽ tiếp tục có hiệu lực
              kể cả trong trường hợp quan hệ hợp đồng bảo hiểm giữa Bên mua bảo
              hiểm với HIAS đã chấm dứt.
            </li>
          </ol>
        </Space>
      </Card>
    </Space>
  );
};

export default Term;
