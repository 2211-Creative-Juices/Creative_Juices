import React, { useState } from 'react';
import { useEffect } from 'react';

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const [openType, setOpenType] = useState(false);
  // const [isRemoteChecked, setIsRemoteChecked] = useState(false);
  const [isRemote, setIsRemote] = useState(false);
  const [type, setIsType] = useState('');
  // const [checked, setChecked]
  // my other ide for how to handle this is set isChecked for each individual checkbox
  // then you handle state changes by saying if(ischecked) change the state for
  // all the selected dropox items
  useEffect(() => {
    setIsRemote(isRemote);
  }, [isRemote]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpenType = () => {
    setOpenType(!openType);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (e.target.checked) {
      setIsRemote(true);
    }
    console.log('this is the isRemoteSTate in submitHandler', isRemote);
  };

  return (
    <div id='dropdown'>
      <button id='isremote-dropdown' onClick={handleOpen}>
        Virtual or In Person?!
      </button>
      {open ? (
        <form>
          <div>
            <div id='dropdownremote'>
              <div>
                <label>
                  Select Here to make it Virtual!
                  <input
                    id='dropdown-virtual'
                    type='checkbox'
                    checked={isRemote}
                    onChange={submitHandler}
                  ></input>
                </label>
              </div>
            </div>
          </div>
          {/* <button type={'submit'}>Submit checked</button> */}
        </form>
      ) : null}
      {/* <button id='type' onClick={handleOpenType}>
        Type?!
      </button> */}
      {/* {openType ? (
        <div>
          <div id='type-drop'>
            <div>
              <label>
                Adults?
                <input
                  id='dropdown-adults'
                  type='checkbox'
                  value={value}
                  onChange={() => {
                    setIsType(value);
                  }}
                ></input>
              </label>
            </div>
          </div>
        </div>
      ) : null} */}
    </div>
  );
};

export default Dropdown;
