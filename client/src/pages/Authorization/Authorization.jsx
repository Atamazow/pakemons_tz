import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { selectToken } from "../../redux/authorization/selectors";
import { signIn } from "../../redux/authorization/thunks";
import styles from './Authorization.module.css'


const Authorization = () => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish =  useCallback(({ login, password }) => {
    dispatch(signIn({ login, password }));
  },[]);

  if (token) navigate("/");

  return (
    <>
      <NavLink
        className={styles.link}
        to="/"
      >
        Главная страница
      </NavLink>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        className={styles.Form}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="login"
          name="login"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default memo(Authorization);
