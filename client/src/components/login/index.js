//การนำเข้าโมดูลและคอมโพเนนต์
import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { login } from "../../api";

//การสร้างคอมโพเนนต์ Login
function Login({ onLoginSuccessful }) {
  // สร้าง state สำหรับเก็บค่า email, password, และสถานะข้อผิดพลาด
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  // ฟังก์ชันที่เรียกเมื่อมีการเปลี่ยนแปลงใน input email หรือ password
  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);

  // ฟังก์ชันที่เรียกเมื่อ form ถูก submit
  const onSubmit = async (event) => {
    event.preventDefault();
    setHasError(false);
    
    // เรียกใช้ฟังก์ชัน login จากไฟล์ api และรอผลลัพธ์
    const loginResult = await login({ email, password });
    
    // ตรวจสอบผลลัพธ์จากการ login
    if (!loginResult) {
      setHasError(true);
    } else {
      // ถ้า login สำเร็จ จะได้ข้อมูล name และ token
      const { name, token } = loginResult;
      
      // บันทึกข้อมูลลงใน localStorage
      localStorage.setItem("name", name);
      localStorage.setItem("token", token);
      
      // เรียกฟังก์ชันที่ถูกส่งเข้ามาเมื่อ login สำเร็จ
      onLoginSuccessful();
    }
  };

  // การคืนค่าของ component Login
  return (
    <Container>
      <Card className="mt-5">
        <Card.Header as="h1">Login</Card.Header>
        <Card.Body>
          <Form className="w-100" onSubmit={onSubmit}>
            {/* ฟอร์มสำหรับใส่ email */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={onEmailChange}
                value={email}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            {/* ฟอร์มสำหรับใส่ password */}
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={onPasswordChange}
                value={password}
              />
            </Form.Group>
            
            {/* แสดง Alert กรณีเกิดข้อผิดพลาดในการ login */}
            {hasError && (
              <Alert variant={"danger"}>
                The email address and password you entered don't match any
                account. Please try again.
              </Alert>
            )}

            {/* ปุ่ม submit */}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
