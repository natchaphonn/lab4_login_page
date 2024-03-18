//การนำเข้าโมดูล React
import React, { useEffect, useState } from "react";
import Login from "./components/login";
import Homepage from "./components/homepage";

//การสร้างคอมโพเนนต์ App
function App() {
  // สร้าง state เพื่อเก็บข้อมูลเกี่ยวกับการลงชื่อเข้าใช้ของผู้ใช้
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  // useEffect ที่ถูกเรียกหลังจาก component ถูก render ครั้งแรก
  useEffect(() => {
    // ตรวจสอบว่ามี token ใน localStorage หรือไม่
    if (localStorage.getItem("token")) setIsUserSignedIn(true);
    else setIsUserSignedIn(false);
  }, []);

  // ฟังก์ชันที่เรียกเมื่อการลงชื่อเข้าใช้เสร็จสมบูรณ์
  const onLoginSuccessful = () => {
    setIsUserSignedIn(true);
  };

  // ฟังก์ชันที่เรียกเมื่อต้องการทำการออกจากระบบ
  const onLogout = () => {
    // ลบข้อมูลที่เก็บใน localStorage
    localStorage.removeItem("name");
    localStorage.removeItem("token");

    // กำหนดค่า isUserSignedIn เป็น false เพื่อแสดงว่าผู้ใช้ไม่ได้ลงชื่อเข้าใช้
    setIsUserSignedIn(false);
  };

  // การคืนค่าของ component App โดยใช้ short-circuit evaluation
  return (
    (isUserSignedIn && <Homepage onLogout={onLogout} />) || (
      <Login onLoginSuccessful={onLoginSuccessful} />
    )
  );
}

export default App;
