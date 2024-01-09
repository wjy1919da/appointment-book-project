import React from "react";
import NextButton from "./next-button.component";
import userInfoQueryStore from "../../../userStore.ts";
import LoginRegisterTitle from "./login-register-title.component";
import { useState, useEffect } from "react";
import { Input, RadioGroup, Stack, Radio } from "@chakra-ui/react";
import "./choose-gender.styles.scss";
// import Calendar from '../../user-appointment/calendar';
import CalendarProfile from "../calendar-profile/calendar-profile.component";
const ChooseGender = () => {
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const setGender = userInfoQueryStore((state) => state.setGender);
  const [birthday, setBirthdayValue] = useState("");
  const switchPopupTab = userInfoQueryStore((state) => state.switchPopupTab);
  const [selectedGender, setSelectedGender] = useState(userInfo.gender);
  const setBirthday = userInfoQueryStore((state) => state.setBirthday);
  const [maxDate, setMaxDate] = useState('');

  const onChangeGrender = (value) => {
    setSelectedGender(value);
    setGender(value);
  };
  const onChangeDate = (e) => {
    // console.log('date checked', e.target.value);
    setBirthdayValue(e.target.value);
  };
  // console.log("userInfo in gender page",userInfo);
  const handleOnClick = () => {
    setBirthday(birthday);
    switchPopupTab("interest");
  };
  const handleSkip = () => {
    setBirthday(null);
    setGender(null);
    switchPopupTab("interest");
  };
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMaxDate(today);
  })

  return (
    <div className="gender-outer-container">
      <div className="choose-gender-title-container">
        <LoginRegisterTitle
          title={"Your Profile"}
          handleBackwards={() => switchPopupTab("sendVerifyEmail")}
          handleSkip={handleSkip}
        />
      </div>
      <div className="profile-content-container">
        <form>
          <div
            className="profile-section-container"
            style={{ marginTop: "-10px" }}
          >
            <div>Gender</div>
            <RadioGroup onChange={onChangeGrender} value={selectedGender}>
              <Stack direction="row">
                <Radio size="md" colorScheme="orange" value="1">
                  Male
                </Radio>
                <Radio size="md" colorScheme="orange" value="2">
                  Female
                </Radio>
                <Radio size="md" colorScheme="orange" value="3">
                  Other
                </Radio>
              </Stack>
            </RadioGroup>
          </div>
          <div className="profile-section-container">
            <div>Birthday</div>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="date"
              className="calendar-input"
              value={birthday}
              onChange={onChangeDate}
              max={maxDate}
            />
            {/* <Calendar/> */}
            {/* <CalendarProfile/> */}
          </div>
          <div className="next-button-section">
            <NextButton
              type="submit"
              title="Next"
              width="180px"
              onClick={handleOnClick}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChooseGender;
