import React, { Component } from 'react'

import { connect } from 'react-redux';

class FormDangKy extends Component {

    state = {
        values:{
            taiKhoan:'',
            hoTen:'',
            matKhau:'',
            sdt:"",
            email:"",
            loaiND:"khachHang"
        },
        errors:{
            taiKhoan:"",
            hoTen:"",
            matKhau:"",
            sdt:"",
            email:"",
            loaiND:""
        }
    }

   
    handleInput = (event) => {
       
        let {value, name} = event.target;

        let newValues = {...this.state.values};
  
        newValues[name] = value;

        let newError = {...this.state.errors};
        let message = "";
        //kiểm tra rỗng
        if(value.trim() === ""){
            //thông báo lỗi
            message = name + " không được để trống";
        }
        let attrValue = event.target.getAttribute("data-type");
        let reg = "";
        // kiểm tra email
        if(attrValue === "email" ){
            reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            // kiểm tra nếu không đúng định dạng
            if(!reg.test(value)){
                //không đúng thì thông báo lỗi
                message = name + " không đúng định dạng";
            }
        }
        newError[name] = message;
        this.setState({
            values:newValues,
            errors:newError
        });
      
    
        // let action={
        //     type:'HANDLE_INPUT',
        //     nguoiDung: {
        //         values:newValues,
        //         errors:newError
        //     }
        // }
        // this.props.dispatch(action);


    }

    handleSubmit = (event) => { 
        //ngăn không load trang khi submit
        event.preventDefault();
        console.log(this.state);

        //kiểm tra lỗi
        let isValid = true;

        // duyệt từng thuộc tính của obj
        for(let key in this.props.nguoiDung.errors){
            // obj literal
            if(this.props.nguoiDung.errors[key] !==""){
                isValid = false;
                // dừng vòng lăp
                break;
            }
        }
        if(!isValid){
            //nếu false => dừng hàm
            alert("Còn lỗi nè");
            return;
        }

        //đẩy state lên store
        let action={
            type:"THEM_NGUOI_DUNG",
            nguoiDung: this.props.nguoiDung.values
        }
        this.props.dispatch(action);

     }



    //  static getDerivedStateFromProps(newProps, currentState){

    //     // suy nghĩ kỹ setState() ở getDerivedStateFromProps => có đổi state nhưng lại render lại UI => chạy lifecycle

    //     //newProps: thongTinNguoiDung từ reducer thông qua mapStateToProps (thongTinND)

    //     //currentState: là state hiện tại của component

    //     //Giup xem duoc thông tin mới ở trên form
        
    //     if(currentState.values.taiKhoan !== newProps.thongTinND.taiKhoan){
    //         //trả về state mới
    //         return {
    //             ...currentState,
    //             values: newProps.thongTinND
    //         }
    //     }
    //     // trả về giá trị hiện tại của state
    //     return currentState;
    //  }

    componentWillReceiveProps(newProps){
        this.setState({
            values:newProps.thongTinND
        });
    }


    render() {
        let {taiKhoan,hoTen,matKhau,sdt,email,loaiND} = this.state.errors
        // let values = this.props.thongTinND;
        let values =  this.state.values;



        // let {taiKhoan,hoTen,matKhau,sdt,email,loaiND} = this.props.nguoiDung.errors
        // let {thongTinND} =this.props
        // let {values} =this.props.nguoiDung
        // console.log(this.props.thongTinND);


        return (
            <div className="card mt-5">
                <form onSubmit={this.handleSubmit} >
                    <div className="card-header bg-dark text-white">
                        Form Đăng Ký
                    </div>
                    <div className="card-body">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Tài Khoản</label>
                                {/* <input onChange={(event) => { 
                                    console.log(event.target);
                                 }} /> */}
                                <input onChange={this.handleInput} type="text" name="taiKhoan" className="form-control" value={values.taiKhoan} />
                                <p className='text-danger'>{taiKhoan}</p>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Họ Tên</label>
                                <input onChange={this.handleInput} type="text" name="hoTen" className="form-control" value={values.hoTen}  />
                                <p className='text-danger'>{hoTen}</p>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Mật Khẩu</label>
                                <input onChange={this.handleInput} type="password" name="matKhau" className="form-control" value={values.matKhau} />
                                <p className='text-danger'>{matKhau}</p>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Số điện thoại</label>
                                <input onChange={this.handleInput} type="text" name="sdt" className="form-control" value={values.sdt} />
                                <p className='text-danger'>{sdt}</p>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input data-type="email"  onChange={this.handleInput} type="email" name="email" className="form-control" value={values.email} />
                                <p className='text-danger'>{email}</p>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Mã loại người dùng</label>
                                <select onChange={this.handleInput} name='loaiND' className="form-control" value={values.loaiND} >
                                    {/* <option>Hãy chọn loại</option> */}
                                    <option value='khachHang'>Khách Hàng</option>
                                    <option value='nhanVien' >Nhân Viên</option>
                                </select>
                                <p className='text-danger'>{loaiND}</p>
                            </div>
                        </div>

                    </div>
                    <div className="card-footer bg-dark">
                        <button className='btn btn-success'>Đăng Ký</button>
                        <button className='btn btn-primary' type="button" onClick={() => { 
                            let action={
                                type:'CAP_NHAT',
                                thongTinCN:this.props.nguoiDung.values
                            }
                            this.props.dispatch(action);
                         }} >Cập Nhật</button>
                    </div>
                </form>
            </div >

        )
    }
}

const mapStateToProps = (rootReducer) => {
    return{
        thongTinND: rootReducer.quanLyNDReducer.thongTinNguoiDung,
        
        nguoiDung:rootReducer.quanLyNDReducer.nguoiDung
    }
}
export default connect(mapStateToProps)(FormDangKy);