import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { Button, Dropdown, Navbar,DropdownButton, FormControl, Nav } from 'react-bootstrap';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../css/create.css';
import bgCreate from '../image/BGCreate2.png';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.toggleCheckPageNum = this.toggleCheckPageNum.bind(this);
    this.toggleCheckAll = this.toggleCheckAll.bind(this);
    this.state = {
      name: '',
      page: '',
      page2: '',
      amount: '',
      size: '',
      format: '',
      color: '',
      value: '',
      address: '',
      tel:'',
      statusOrder: false,
      rand: Math.floor(Math.random() * 100000 + 1),
      checkPageAll: false,
      checkPageNum: false,
      file: [{
        source: 'localhost:3000/create',
        options: {
            type: 'local'
        }
    }]
    };
  }

  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
}

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleChange = event => {
    this.setState({ value: event.target.value});
  }


  onSubmit = (e) => {
    e.preventDefault();
    const { name, amount, size, format ,color, page, page2, tel, address, statusOrder, rand} = this.state;

    confirmAlert({
      title: 'Confirm to submit',
    message: <text>ชื่อ: {this.state.name}<br />
    หน้าที่: {this.state.page}-{this.state.page2}<br />
    ขนาดกระดาษ: {this.state.size}<br />
    จำนวนหน้า: {this.state.amount}<br />
    สี: {this.state.color}<br />
    รูปแบบการเข้าเล่ม: {this.state.format}<br />
    ที่อยู่: {this.state.address}<br />
    เบอร์ติดต่อ: {this.state.tel}</text>,
      buttons: [
        {
          label: 'Yes',
          onClick: ()=> this.ref.add({
            name,
            page,
            page2,
            amount,
            size,
            format,
            color,
            tel,
            address,
            statusOrder,
            rand
          }).then((docRef) => {
            this.setState({
              name: '',
              page: '',
              page2: '',
              amount: '',
              size: '',
              format: '',
              color: '',
              address: '',
              tel:'',
              statusOrder: '',
              rand: ''
            });
            this.props.history.push("/history")
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
        })
        },
        {
          label: 'No',
        }
      ]
    });
  };
  toggleCheckAll() {
    this.setState({
      checkPageAll: !this.state.checkPageAll
  });
  }
  toggleCheckPageNum() {
    this.setState({
      checkPageNum: !this.state.checkPageNum
  });
  }

  render() {

    const { name, amount, size, format, color, page, page2, tel, address, statusOrder, rand} = this.state;
    const checkPageAll = this.state.checkPageAll;
    const checkPageNum = this.state.checkPageNum;
    let checkPage;
      if(checkPageAll==true && checkPageNum==false){
       checkPage = <div><text>ทั้งหมด &nbsp;</text><input type="checkbox" name="page" value="All" onChange={this.onChange} onClick={this.toggleCheckAll}/>
<text>&nbsp;เลือกหน้า &nbsp;</text><input disabled type="checkbox" onClick={this.toggleCheckPageNum}/></div>
      }
      else if(checkPageAll==false && checkPageNum==true){
        checkPage = <div><text>ทั้งหมด &nbsp;</text><input disabled type="checkbox" name="page" value="All" onChange={this.onChange} onClick={this.toggleCheckPageNum}/>
        <text>&nbsp;เลือกหน้า &nbsp;</text><input type="checkbox" onClick={this.toggleCheckPageNum}/><br /><text>จาก:</text><input type="number" min='1' max='99' class="form-control" name="page" value={page} onChange={this.onChange} placeholder="1-99" required/>
        <text>ถึง:</text><input type="number" min={page} max='99' class="form-control" name="page2" value={page2} onChange={this.onChange} placeholder="1-99" required/></div>
      }
      else{
        checkPage = <div><text>ทั้งหมด &nbsp;</text><input type="checkbox" name="page" value="All" onChange={this.onChange} onClick={this.toggleCheckAll}/>
        <text>&nbsp;เลือกหน้า &nbsp;</text><input type="checkbox" onClick={this.toggleCheckPageNum}/></div>
      }
     
    return (
      <div class="bgCreate">
      <div class="container">
        <header>
            <Navbar id="narbar" className="navAll">
              <Navbar.Brand href="#home" id="nbText1">สระแก้ว ก๊อปปี้แอนด์เซอร์วิส</Navbar.Brand>
                <Nav id="nbText2" className="mr-auto">
                  <Nav.Link href="/create">สร้างรายการสั่งทำ</Nav.Link>
                  <Nav.Link href="/history">ประวัติการสั่งทำ</Nav.Link>
                </Nav>
                <Nav.Link href="/profile" id="nbText3">Profile</Nav.Link>
                <Nav.Link href="/" id="nbText3">logout</Nav.Link>
              {/* <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
              </Navbar.Collapse> */}
            </Navbar>
          </header>
        <br></br>
        
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 id="orderHead" class="panel-name">
              รายการสั่งทำ
            </h3>
          </div>
          <div class="panel-body">
            {/* <h4><Link to="/history" class="btn btn-primary">ประวัติการสั่งทำ</Link></h4> */}

            <div class="form-group">
                <label for="name" id="font">ชื่อผู้รับเอกสาร:</label>
                <input id="focus" id="sizeName" type="text" class="form-control" name="name" value={name} onChange={this.onChange} required/>
              </div>

            <form onSubmit={this.onSubmit}>
              <div id="font" class="form-group">
                <label for="page">หน้าที่ต้องการ:</label>
                {checkPage}
              </div>

              <div id="font" class="form-group">
                <label for="size">ขนาดกระดาษ: &nbsp;</label>
                <select name="size" id="box" value={size} variant="secondary" onChange={this.handleChange} onChange={this.onChange} placeholder="size" required>
                    <option value="">select</option >
                    <option value="A3">A3</option >
                    <option value="A4">A4</option >
                    <option value="B4">B4</option >
                    <option value="F14">F14</option >
                </select >
              </div>

              <div class="form-group">
                <label for="amount" id="font">จำนวนสำเนา:</label>
                <input id="focus" id="sizeCopy" type="number" class="form-control" min='1' name="amount" value={amount} onChange={this.onChange} placeholder="ex: 1" required/>
              </div>

              <div id="font" class="form-group">
              <label for="color">สี: &nbsp;</label>
                  <select name="color" id="box" value={color} variant="secondary" onChange={this.handleChange} onChange={this.onChange} placeholder="color" required>
                    <option value="">select</option >
                    <option value="ขาว-ดำ">ขาว-ดำ</option >
                    <option value="สี">สี</option >
                </select >
            </div>

              <div id="font" class="form-group">
              <label for="format">รูปแบบการเข้าเล่ม: &nbsp;</label>
                  <select id="box" name="format" value={format} variant="secondary" onChange={this.handleChange} onChange={this.onChange} placeholder="format" required>
                    <option value="">select</option >
                    <option value="เย็บมุม">เย็บมุม</option >
                    <option value="สันกระดูกงู">สันกระดูกงู</option >
                    <option value="สันเกลียว">สันเกลียว</option >
                    <option value="ผลงาน">ผลงาน</option >
                    <option value="แลคซีน">แลคซีน</option >
                </select >
            </div>
              
            <div class="form-group">
                <label id="font" for="address">ที่อยู่:</label>
                <input id="focus" id="sizeAddr" type="text" class="form-control" name="address" value={address} onChange={this.onChange} placeholder="ex: 12/345" required/>
              </div>

              <div class="form-group">
                <label id="font" for="tel">เบอร์ติดต่อ:</label>
                <input id="focus" id="sizeTel" type="tel" class="form-control" name="tel" value={tel} onChange={this.onChange} placeholder="ex: 0812345678" required/>
              </div>
              <div> 
              <label id="font" for="file">อัพโหลดไฟล์เอกสาร:</label>
                <FilePond ref={ref => this.pond = ref}
                          files={this.state.files}
                          allowMultiple={true}
                          maxFiles={3} 
                          server="/api"
                          oninit={() => this.handleInit() }
                          onupdatefiles={fileItems => {
                              this.setState({
                                  files: fileItems.map(fileItem => fileItem.file)
                              });
                          }}>
                </FilePond></div>
              <button id="btnSubmit" type="submit" class="btn btn-success" name="statusOrder" value={statusOrder} onChange={this.onChange}  ></button>

              </form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Create;