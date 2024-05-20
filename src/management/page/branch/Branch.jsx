import React, { useEffect, useState } from 'react'
import AddBranch from '../../components/modal/addBranch/AddBranch'
import './Branch.css'
import axios from 'axios'
import server from '../../../api/APIPath'
import UpdateBranchModal from '../../components/modal/updateBranch/UpdateBranchModal'
const Branch = () => {
    const [branchList, setBranchList] = useState([])
    const [isUpdateBranch, setIsUpdateBranch] = useState(false)
    const [branchId, setBranchId] = useState('')
    const onCloseUpdateBranch = () => {setIsUpdateBranch(false);
    getBranchList();
    }

    useEffect(() => {
        getBranchList()
    }, [])
    const getBranchList = async () => {
        axios.get(server + "/api/v1/management/branch/all?showAll=false&showInActive=false", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then((response) => {
                console.log(response.data)
                setBranchList(response.data.body)
            }
            )
            .catch((error) => {
                console.log(error)
            })
    }
    
    const [isOpenAddBranch, setIsOpenAddBranch] = useState(false)
    const onCloseAddBranch = () => {setIsOpenAddBranch(false);
    getBranchList()}
    const deleteBranch = (id) => {
        axios.delete(server + "/api/v1/management/branch/" + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then((response) => {
                console.log(response.data)
                getBranchList()
            }
            )
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div>
            <h1>Quản lý chi nhánh</h1>
            <button className='add' onClick={()=>setIsOpenAddBranch(true)}>Thêm chi nhánh mới</button>
            <div className="table">
            <table className='table'>
                <thead>
                    <tr>
                        <th colSpan="3">Danh sách chi nhánh</th>
                    </tr>

                    <tr>
                        <th>Mã chi nhánh</th>
                        <th>Địa chỉ</th>
                        <th>Thao tác</th>
                    </tr>
                    {/* <tr>
                        <th></th>
                        <th><input placeholder='113, Lê Thánh Tông' /></th>
                        <th><button>Lọc danh sách</button></th>
                    </tr> */}
                </thead>

                <tbody>
                    {branchList == null ? (
                        <tr>
                            <td colSpan="4">Không có dữ liệu</td>
                        </tr>
                    ) : (
                        branchList.map((branch, index) => (
                            <tr key={index}>
                                <td>{branch.id}</td>
                                <td>{branch.location}</td>
                                <td>
                                    <button onClick={()=>deleteBranch(branch.id)}>Xoá chi nhánh</button>
                                    {/* <button onClick={hideBranch(branch.id)}>Ẩn Chi Nhánh</button> */}
                                    <button onClick={()=>{setIsUpdateBranch(true);setBranchId(branch.id)}}>Cập nhật thông tin</button>
                                    {/* <button>Quản lý doanh thu</button>
                                    <button>Quản lý chi tiết</button> */}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            </div>
            {/* <div className="moreGroup">
                <button>Hiển thị thêm</button>
                <p>Đang hiển thị 100/500 chi nhánh</p>
            </div>
            <div className="listSettingGroup">
                <select>
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                    <option>100</option>
                    <option>Tất cả</option>
                </select>
                <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div> */}
            <AddBranch isOpen={isOpenAddBranch} onClose={onCloseAddBranch} />
            <UpdateBranchModal isOpen={isUpdateBranch} onClose={onCloseUpdateBranch} branchid={branchId}/>
        </div>
    )
}

export default Branch