import React, { useEffect, useState } from 'react'
import server from '../../config/APIPath'
import AddBranch from '../../components/modal/addBranch/AddBranch'
import './Branch.css'
import APIInformation from '../../config/APIInformation'
const Branch = () => {
    const [branchList, setBranchList] = useState([])
    useEffect(() => {
        getBranchList()
    }, [])
    const getBranchList = async () => {
        // Call API to get branch list
        try {
            const url = server + "/admin/branch/all?showDisabled=true";
            console.log(url);
            // const respone = await fetch(url);
            const respone = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + localStorage.getItem('token')
                    // Xác thực username password
                    'Authorization': 'Basic ' + btoa(APIInformation.username + ":" + APIInformation.password)
                }
            });
            const data = await respone.json();
            setBranchList(data.body);
            console.log(branchList);
        }
        catch (err) {
            console.log(err);

        }
    }
    const [isOpenAddBranch, setIsOpenAddBranch] = useState(false)
    const onCloseAddBranch = () => {setIsOpenAddBranch(false);
    getBranchList()}
    const hideBranch = (id) => async () => {
        // Call API to hide branch
        try {
            const url = server + "/admin/branch/hide/" + id;
            console.log(url);
            const respone = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            const data = await respone.json();
            console.log(data);
            getBranchList();
        }
        catch (err) {
            console.log(err);

        }
    }
    return (
        <div>
            <h1>Quản lý chi nhánh</h1>
            <button className='add' onClick={()=>setIsOpenAddBranch(true)}>Thêm chi nhánh mới</button>
            <table className='table'>
                <thead>
                    <tr>
                        <th colSpan="4">Danh sách chi nhánh</th>
                    </tr>

                    <tr>
                        <th>Mã chi nhánh</th>
                        <th>Địa chỉ</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th><input placeholder='113, Lê Thánh Tông' /></th>
                        <th>
                            <select>
                                <option>Hoạt động</option>
                                <option>Đã ẩn</option>
                            </select>
                        </th>
                        <th><button>Lọc danh sách</button></th>
                    </tr>
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
                                    {branch.deleted === false ? "Hoạt động" : "Đã ẩn"}
                                </td>
                                <td>
                                    <button>Đổi Thông Tin</button>
                                    <button onClick={hideBranch(branch.id)}>Ẩn Chi Nhánh</button>
                                    <button>Quản lý doanh thu</button>
                                    <button>Quản lý chi tiết</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="moreGroup">
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
            </div>
            <AddBranch isOpen={isOpenAddBranch} onClose={onCloseAddBranch} />
        </div>
    )
}

export default Branch