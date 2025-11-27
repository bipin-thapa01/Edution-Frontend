import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Ring } from 'ldrs/react';
import 'ldrs/react/Ring.css';

export default function Settings({fetchData}) {
  const [rightContent, setRightContent] = useState(null);

  const data = [{
    title: 'Change Name',
    description: ''
  },
  {
    title: 'Change Username',
    description: ''
  },
  {
    title: 'Change Profile Picture',
    description: '',
  },
  {
    title: 'Change Bio',
    description: ''
  },
  {
    title: 'Change Background Image',
    description: ''
  },
  ];

  useEffect(()=>{
    if(fetchData){
      setRightContent(
        <>
          <div id="settings-right-container-header">
            {data[0].title}
          </div>
        </>
      );
      document.getElementById(`settings-left-container-option0`).classList.add('selected-option');
    }
  },[fetchData]);

  const displayRightContent = (index) => {
    setRightContent(
      <>
        <div id="settings-right-container-header">
          {data[index].title}
        </div>
        <div id="settings-right-container-change">
          <div>Enter your new username: </div>
          <input type="text"/>
        </div>
      </>
    );
    document.querySelectorAll('.settings-left-container-option').forEach(option => {
      option.classList.remove('selected-option');
    });
    document.getElementById(`settings-left-container-option${index}`).classList.add('selected-option');
  }

  return <div id="settings-container">
    <div id="settings-left-container">
      <div id="settings-left-container-header">
        Settings
      </div>
      <div id="settings-left-container-options">
        {
          data.map((item, index) => {
            return <div onClick={() => displayRightContent(index)} key={index} className="settings-left-container-option" id={`settings-left-container-option${index}`}>
              <div>{item.title}</div>
              <div>
                <MdKeyboardArrowRight />
              </div>
            </div>
          })
        }
      </div>
    </div>
    <div id="settings-right-container">
      {rightContent ? rightContent :
        <div id="settings-loader">
          <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
        </div>}
    </div>
  </div>
}