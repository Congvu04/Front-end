import { statusCode } from "@/common/enum";
import {
  fetcher_$POST,
  notificationError,
  notificationSuccess,
} from "@/common/functionglobal";
import { classSV } from "@/services/class";
import { teacher } from "@/services/teacher";
import { Form, Input, Modal, Select } from "antd";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";

const { Item } = Form;

type Props = {
  show: boolean;
  handleCreateManageClassModalClose: any;
};

const CreateManageClassModal: React.FC<Props> = (props) => {
  const [form] = Form.useForm();

  const {
    trigger,
    data: dataCreateClass,
    error,
  } = useSWRMutation(classSV().create, fetcher_$POST);


  const [semeter, setSemeter] = useState('');
  const [year, setYear] = useState('');
  const parameter = year.toString() + semeter.toString()

  const handleFormSubmit = async (values: any) => {
    trigger({
      ...values,
      id: 0,
      userAdded: 0,
      is_delete: false,
      teacher_id: 0,
      semester: parameter,
      status: 0,
    });
    console.log(parameter)
  };

  useEffect(() => {
    if (dataCreateClass?.statusCode == statusCode.OK) {
      notificationSuccess("Thêm mới thành công");
      props.handleCreateManageClassModalClose(dataCreateClass?.data);
    }
    else if (dataCreateClass?.statusCode == statusCode.Error) {
      notificationError(`${dataCreateClass?.message}`);
    }
    if (error) {
      notificationError(`${error}`);
    }
  }, [dataCreateClass, error]);

  /*** Form Data and Handle Data for Filter Class*/


  const optionSemester = [
    {
      id: 1,
      value: '1',
      label: 'Học kì 1'
    },
    {
      id: 2,
      value: '2',
      label: 'Học kì 2'
    }
  ]



  const optionYears = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
  return (
    <>
      <Modal
        title={"Thêm mới"}
        centered
        open={props.show}
        onOk={() => {
          form.submit();
        }}
        okButtonProps={{
          className: "bg-blue-500",
        }}
        okText="Xác nhận"
        cancelText="Thoát"
        onCancel={props.handleCreateManageClassModalClose}
      >
        <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
          <Item
            name="code"
            label="Mã"
            rules={[{ required: true, message: "Vui lòng nhập mã lớp!" }]}
          >
            <Input required />
          </Item>
          <Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: "Vui lòng nhập tên lớp!" }]}
          >
            <Input required />
          </Item>
          <Item
            name="semeter"
            label="Kì học"
            rules={[{ required: true, message: "Vui lòng nhập kì học!" }]}
          >
            <Select placeholder='Chọn học kì' className="me-2"
              options={[...optionSemester]} onChange={value => setSemeter(value)}
            />
          </Item>
          <Item
            name="year"
            label="Năm học"
            rules={[{ required: true, message: "Vui lòng nhập năm học!" }]}
          >
            <Select placeholder='Chọn năm' className="me-2" onChange={(e) => {
              setYear(e)
              console.log(e)
            }}>
              {optionYears.map(year => (
                <Select.Option key={year} value={year}>{year}</Select.Option>
              ))}
            </Select>
          </Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateManageClassModal;
