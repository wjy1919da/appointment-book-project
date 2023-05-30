import './doctor.styles.scss';
// import { getData } from '../../utils/apiService.js';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../../components/home-button/home-button.component';

const Doctor = () => {
  const [searchCondition, setSearchCondition] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  
  const handleSearch = async () => {
      if (!searchCondition) {
          alert('input can not be empty');
          return;
      }
      if (!city) {
          alert('city can not be empty');
          return;
      }
      
      try {
       
        
        // 搜索不到信息也是200 成功，页面显示找到0个结果
        // 登录状态管理
        
        // 后台异常
        // const response = await getData(
        //   'https://run.mocky.io/v3/1ed0be25-97e5-416f-8404-53a1cb71a69d', 
        //   { searchCondition, city }
        // );
        // console.log(response);
        // if(response.status !== 200){
        //    // 显示错误信息:404,505....
        //     console.log(response.status);
        // }
      } catch (error) {
        if(error.response.status){
          // 前台处理错误 弹出错误信息
          alert(error.response.status);
        }
    }
     
  };
  return (
     <div>
           <input
              type="text"
              placeholder="search treatment or doctor"
              value={searchCondition}
              onChange={(e) => setSearchCondition(e.target.value)}
          />
          <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
          />
          <HomeButton title="search" onClick={handleSearch} />
     </div> 
  )
};

export default Doctor;
