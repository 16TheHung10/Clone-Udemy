import { LoadingOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Modal,
  Row,
  Switch,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import { uploadFile } from "apis/features/CreateCourse/CreateCourseAPI";
import { Bin } from "assets/IconComponent";
import { schemaQuestionChoice } from "containers/ContentPage/components/CreateCourse/validate/schema";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "../Modal/ModalLecture.css";
const { Text, Title, Paragraph } = Typography;
export default function EditSingleChoice({
  questions,
  setQuestions,
  questionEdit,
  id,
  handleOkEdit,
}) {
  const removeOptions = useRef();
  const [formSingleChoice] = Form.useForm();
  const [fileImg, setFileImg] = useState("");
  const [loadingImg, setLoadingImg] = useState(false);
  useEffect(() => {
    setFileImg(questionEdit.imageUrl);
  }, [setFileImg, questionEdit]);
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    handleSubmit,
    reset,
    trigger,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schemaQuestionChoice),
    defaultValues: questionEdit,
  });
  const propsImg = {
    beforeUpload: (file) => {
      const isPNG =
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg";

      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
        return false;
      } else {
        setLoadingImg(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "image");
        uploadFile(formData)
          .then((res) => {
            message.success("Upload Image Successfully");
            setFileImg(res.data.url);
            setValue("imageUrl", res.data.url);
            setLoadingImg(false);
            clearErrors("imageUrl");
          })
          .catch((err) => {
            setLoadingImg(false);
            message.error(err);
          });
        return false;
      }
    },
    maxCount: 1,
    showUploadList: false,
  };
  const [isDeleteImg, setIsDeleteImg] = useState(false);

  const showModalDeleteImg = () => {
    setIsDeleteImg(true);
  };

  const handleOkImg = () => {
    setIsDeleteImg(false);
  };

  const handleCancelImg = () => {
    setIsDeleteImg(false);
  };

  const renderDeleteImgModal = () => {
    return (
      <Modal
        title={`Do you want to delete this Question Image ?`}
        visible={isDeleteImg}
        onOk={handleOkImg}
        onCancel={handleCancelImg}
        footer={[
          <Button
            key="submit"
            className="btn-red"
            onClick={() => {
              setFileImg("");
              setValue("imageUrl", "");
              message.success("Delete Image Successfully");
              handleOkImg();
            }}
          >
            Yes
          </Button>,
          <Button key="back" onClick={handleCancelImg} className="btn-cancel">
            No
          </Button>,
        ]}
      >
        <p>Click Yes to delete this Question Image or click No to cancel</p>
      </Modal>
    );
  };
  const onSubmit = (data) => {
    const question = getValues();
    question.key = question.title;
    const index = questions.findIndex((item) => {
      return item.title === question.title;
    });
    if (index === -1 || index === id) {
      const tempQuestionList = [...questions];
      tempQuestionList[id] = question;
      setQuestions(tempQuestionList);
      handleOkEdit();
      reset();
      setFileImg("");
      setValue("imageUrl", "");
      removeOptions.current.click();
    } else message.error("Question title was exist");
  };
  return (
    <>
      {renderDeleteImgModal()}
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        form={formSingleChoice}
        onFinish={handleSubmit(onSubmit)}
      >
        <Row className="edit-picture-upload">
          <Col xs={24} md={6} className="padding-all">
            {fileImg ? (
              <div className="uploaded-container">
                <Image width={"10.2rem"} height={"auto"} src={fileImg} />
                <Bin
                  className="delete-img-button"
                  onClick={() => {
                    showModalDeleteImg();
                  }}
                />
              </div>
            ) : (
              <Upload {...propsImg} listType="picture-card">
                {loadingImg ? (
                  <LoadingOutlined className="mg-right text-bold" />
                ) : (
                  <PlusSquareOutlined className="mg-right text-bold" />
                )}
                <Text className="text-bold">Image</Text>
              </Upload>
            )}
            {errors.imageUrl && (
              <Text className="error-message text-center">
                {errors.imageUrl?.message}
              </Text>
            )}
          </Col>
          <Col xs={24} md={13} className="padding-all">
            <Form.Item label="Question Title*">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Write title here" />
                    {errors.title && (
                      <Text className="error-message">
                        {errors.title?.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={5} className="padding-all">
            <Form.Item label="Score*">
              <Controller
                name="score"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Score" />
                    {errors.score && (
                      <Text className="error-message">
                        {errors.score?.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <div>
          <Form.List
            name="options"
            initialValue={questionEdit.options}
            rules={[
              {
                validator: async (_, names) => {
                  let validateChecked;
                  if (!names || names.length < 2) {
                    return Promise.reject(new Error("At least 2 options"));
                  }
                  if (names) {
                    validateChecked = names?.reduce((a, b) => {
                      if (b?.isCorrectAnswer === true) {
                        return (a = a + 1);
                      } else return a;
                    }, 0);
                  }
                  if (names && validateChecked > 1) {
                    return Promise.reject(new Error("Only 1 option correct"));
                  }
                  if (names && validateChecked === 0) {
                    return Promise.reject(new Error("Need 1 option correct"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => {
              return (
                <div>
                  <Button
                    className="btn-red"
                    onClick={() => {
                      if (fields?.length > 3) {
                        message.error("Maximum 4 Options");
                      } else add();
                      clearErrors("options");
                    }}
                  >
                    Add Option
                  </Button>
                  <Button
                    onClick={() => {
                      remove([0, 1, 2, 3, 4]);
                    }}
                    ref={removeOptions}
                    style={{ display: "none" }}
                  >
                    a
                  </Button>
                  {fields.map((field, index) => {
                    return (
                      <div
                        className="option-container mg-y"
                        key={`${field.key}a`}
                      >
                        <div className="display-flex option-header padding-y  padding-x-2 justify-content-between align-item-center">
                          <Title level={5}>{index + 1}. Option</Title>
                          <Tooltip placement="top" title={"Delete Option"}>
                            <Bin
                              className="lecture-icon-action"
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          </Tooltip>
                        </div>
                        <div className="padding-y  padding-x-2">
                          <Form.Item label="Option Title*">
                            <Form.Item
                              {...field}
                              noStyle
                              key={`titleOption${index}`}
                              name={[field.name, "title"]}
                              validateTrigger={["onChange", "onBlur"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your option!",
                                },
                              ]}
                              fieldKey={[field.fieldKey, "title"]}
                            >
                              <Input placeholder="Write option title here" />
                            </Form.Item>
                          </Form.Item>
                          <Form.Item label="Correct Answer*">
                            <Form.Item
                              {...field}
                              noStyle
                              key={`isCorrectOption${index}`}
                              name={[field.name, "isCorrectAnswer"]}
                              initialValue={false}
                              valuePropName="checked"
                              fieldKey={[field.fieldKey, "isCorrectAnswer"]}
                            >
                              <Switch />
                            </Form.Item>
                          </Form.Item>
                          <Form.ErrorList errors={errors} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </Form.List>
          {errors.options && (
            <Paragraph className="error-message">
              {errors.options?.message}
            </Paragraph>
          )}
          <Button
            htmlType="submit"
            onClick={() => {
              const optionList = formSingleChoice.getFieldValue("options");
              setValue("options", optionList);
              trigger(["title", "score", "options", "imageUrl"]);
            }}
            className="btn-red mg-top"
          >
            Save Change
          </Button>
        </div>
      </Form>
    </>
  );
}
