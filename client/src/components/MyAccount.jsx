// import React, { useState } from 'react';
// import Avatar from '@mui/material/Avatar';
// import { Button } from '@mui/material';
// import '../css/MyAccount.css';

// const MyAccount = () => {
//     const [selectedItem, setSelectedItem] = useState('Account');

//     const handleItemClick = (itemName) => {
//         setSelectedItem(itemName);
//     };

//     return (
//         <div className="my-account-container">
//             <div className="title-section">
//                 <h1>My Account</h1>
//             </div>
//             <div className="body-section">
//                 <div className="left-section">
//                     <div className="avatar-section">
//                         <Avatar alt="Avatar" src="/path/to/avatar.jpg" />
//                         <p className="name">Devesh Kundu</p>
//                     </div>
//                     <div className="navigation-section">
//                         <p className={selectedItem === 'Account' ? 'selected' : ''} onClick={() => handleItemClick('Account')}>Account</p>
//                         <p className={selectedItem === 'Address' ? 'selected' : ''} onClick={() => handleItemClick('Address')}>Address</p>
//                         <p className={selectedItem === 'Orders' ? 'selected' : ''} onClick={() => handleItemClick('Orders')}>Orders</p>
//                         <p className={selectedItem === 'Log Out' ? 'selected' : ''} onClick={() => handleItemClick('Log Out')}>Log Out</p>
//                     </div>
//                 </div>
//                 <div className="right-section">
//                     <div className="details-section">
//                         <form>
//                             <h2>Account Details</h2>
//                             <div className="input-group">
//                                 <label htmlFor="first-name">First Name *</label>
//                                 <input id="first-name" type="text" placeholder="First name" />
//                             </div>
//                             <div className="input-group">
//                                 <label htmlFor="last-name">Last Name *</label>
//                                 <input id="last-name" type="text" placeholder="Last name" />
//                             </div>
//                             <div className="input-group">
//                                 <label htmlFor="display-name">Display Name *</label>
//                                 <input id="display-name" type="text" placeholder="Display name" />
//                                 <p className="info-text"><i>This will be how your name will be displayed in the account section and in reviews</i></p>
//                             </div>
//                             <div className="input-group">
//                                 <label htmlFor="email">Email *</label>
//                                 <input id="email" type="email" placeholder="Email address" />
//                             </div>
//                             <h2>Password</h2>
//                             <div className="input-group">
//                                 <label htmlFor="old-password">Old Password *</label>
//                                 <input id="old-password" type="password" placeholder="Old password" />
//                             </div>
//                             <div className="input-group">
//                                 <label htmlFor="new-password">New Password *</label>
//                                 <input id="new-password" type="password" placeholder="New password" />
//                             </div>
//                             <div className="input-group">
//                                 <label htmlFor="repeat-password">Repeat New Password *</label>
//                                 <input id="repeat-password" type="password" placeholder="Repeat New password" />
//                             </div>
//                             <Button variant="contained" color="primary" className="save-btn">Save Changes</Button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyAccount;

import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import '../css/MyAccount.css';

const MyAccount = () => {
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState('Account');

    const handleItemClick = (itemName) => {
        setSelectedItem(itemName);
    };

    const renderRightSection = () => {
        switch (selectedItem) {
            case 'Account':
                return (
                    <form>
                        <h2>Account Details</h2>
                        <div className="input-group">
                            <label htmlFor="first-name">First Name *</label>
                            <input id="first-name" type="text" placeholder="First name" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="last-name">Last Name *</label>
                            <input id="last-name" type="text" placeholder="Last name" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="display-name">Display Name *</label>
                            <input id="display-name" type="text" placeholder="Display name" />
                            <p className="info-text"><i>This will be how your name will be displayed in the account section and in reviews</i></p>
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email *</label>
                            <input id="email" type="email" placeholder="Email address" />
                        </div>
                        <h2>Password</h2>
                        <div className="input-group">
                            <label htmlFor="old-password">Old Password *</label>
                            <input id="old-password" type="password" placeholder="Old password" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="new-password">New Password *</label>
                            <input id="new-password" type="password" placeholder="New password" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="repeat-password">Repeat New Password *</label>
                            <input id="repeat-password" type="password" placeholder="Repeat New password" />
                        </div>
                        <Button variant="contained" color="primary" className="save-btn">Save Changes</Button>
                    </form>
                );
            case 'Address':
                return (
                    <div className="address-section">
                        <div className="address-box">
                            <h2>Billing Address</h2>
                            <p>Sofia Havertz</p>
                            <p>(+1) 234 567 890</p>
                            <p>345 Long Island, NewYork, United States</p>
                            <Button variant="contained" color="primary" className="edit-btn">Edit</Button>
                        </div>
                        <div className="address-box">
                            <h2>Shipping Address</h2>
                            <p>Sofia Havertz</p>
                            <p>(+1) 234 567 890</p>
                            <p>345 Long Island, NewYork, United States</p>
                            <Button variant="contained" color="primary" className="edit-btn">Edit</Button>
                        </div>
                    </div>
                );
                case 'Orders':
                    return (
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th className="orders-header">Number ID</th>
                                    <th className="orders-header">Dates</th>
                                    <th className="orders-header">Status</th>
                                    <th className="orders-header">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="orders-row">
                                    <td className="orders-data">#3456_768</td>
                                    <td className="orders-data">October 17, 2023</td>
                                    <td className="orders-data">Delivered</td>
                                    <td className="orders-data">Rs. 1234.00</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr className="orders-row">
                                    <td className="orders-data">#3456_980</td>
                                    <td className="orders-data">October 11, 2023</td>
                                    <td className="orders-data">Delivered</td>
                                    <td className="orders-data">Rs. 345.00</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr className="orders-row">
                                    <td className="orders-data">#3456_120</td>
                                    <td className="orders-data">August 24, 2023</td>
                                    <td className="orders-data">Delivered</td>
                                    <td className="orders-data">Rs. 2345.00</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr className="orders-row">
                                    <td className="orders-data">#3456_030</td>
                                    <td className="orders-data">August 12, 2023</td>
                                    <td className="orders-data">Delivered</td>
                                    <td className="orders-data">Rs. 845.00</td>
                                </tr>
                            </tbody>
                        </table>
                    );
                
            case 'Log Out':
                navigate('/login');
                break;
            default:
                return null;
        }
    };

    return (
        <div className="my-account-container">
            <div className="title-section">
                <h1>My Account</h1>
            </div>
            <div className="body-section">
                <div className="left-section">
                    <div className="avatar-section">
                        <Avatar alt="Avatar" src="/path/to/avatar.jpg" />
                        <p className="name">Devesh Kundu</p>
                    </div>
                    <div className="navigation-section">
                        <p className={selectedItem === 'Account' ? 'selected' : ''} onClick={() => handleItemClick('Account')}>Account</p>
                        <p className={selectedItem === 'Address' ? 'selected' : ''} onClick={() => handleItemClick('Address')}>Address</p>
                        <p className={selectedItem === 'Orders' ? 'selected' : ''} onClick={() => handleItemClick('Orders')}>Orders</p>
                        <p className={selectedItem === 'Log Out' ? 'selected' : ''} onClick={() => handleItemClick('Log Out')}>Log Out</p>
                    </div>
                </div>
                <div className="right-section">
                    {renderRightSection()}
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
