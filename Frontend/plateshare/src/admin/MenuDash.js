import React, { useState, useEffect } from 'react';
import '../admin/AdminDashboard.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import  Modal  from 'react-bootstrap/Modal';


function MenuDash() {
    const [menu_name, setmenuname] = useState("");
    const [menu_type, setmenutype] = useState("");
    const [menu_price, setmenuprice] = useState("");
    const [menu_rating, setmenurating] = useState("");
    const [menu_Image, setmenuImage] = useState("");
    const[modelIsOpen,setModelIsOpen]=useState(true);
const closeModal =()=>{
    setModelIsOpen(false);


}
const openModal =(menuList) => {
    setModelIsOpen(true);
}


    const handleMenu = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('menuImage', menu_Image);
        if (menu_Image && menu_Image.length > 0) {
            formData.append('menuimage', menu_Image[0]);
        }
        formData.append('menu_price', menu_price);
        formData.append('menu_type', menu_type);
        formData.append('menu_name', menu_name);
        formData.append('menu_rating', menu_rating);
        formData.append('menu_Image', menu_Image);

        let addMenu = 'http://localhost:10000/menu/create_menu'

        let addMenuResponse = await fetch(addMenu, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
        console.log(formData)
        let parsedData = await addMenuResponse.json();
        console.log(parsedData);
        console.log(formData)

        if (addMenuResponse.status === 201) {
            alert('Menu Added Successfully');
            setmenuname('');
            setmenuprice('');
            setmenurating('');
            setmenutype('');
            setmenuImage('');


        }

        else {
            if (parsedData.menu_type) {
                alert(parsedData.menu_type);
            }

            else if (parsedData.menu_price) {
                alert(parsedData.menu_price);
            }
            else if (parsedData.menu_name) {
                alert(parsedData.menu_name);
            }
            else if (parsedData.menu_rating) {
                alert(parsedData.menu_rating);
            }
            else if (parsedData.menu_Image) {
                alert(parsedData.menu_Image);
            }

        }
    }
    const [menuList, setMenuList] = useState([])
    const fetchMenuList = () => {
        fetch('http://localhost:10000/menu/get_menu')
            .then(response => response.json())
            .then(data => {
                setMenuList(data.data);
                console.log(menuList)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {
        fetchMenuList()
    }, [])
    const handleEdit = (Id) => {
        fetch(`http://localhost:10000/menu/put_menu${Id}/`)
            .then(response => response.json())
            .then(data => {
                setmenuname(data.menu_name);
                setmenuprice(data.menu_price);
                setmenutype(data.menu_type);
                setmenurating(data.menu_rating);
                setmenuImage(data.menu_Image);

            });
    }

    const handleDelete = (Id) => {
        fetch(`http://localhost:10000/menu/delete_menu${Id}/`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                //       // Optionally, refresh the room list after a successful delete
                fetchMenuList();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    return (
        <div className="App">
            <div className="sidebar">
                <h3 className="sidebar-heading">Admin Panel</h3>
                <ul className="sidebar-menu">
                    <li><a href="/dashboard">Dashboard</a></li>

                    <li><a href="#">Order</a></li>
                    <li><a href="#">User List</a></li>
                    <li><a href="#">Menu</a></li>
                    <li><a href="#">Donations</a></li>
                </ul>
            </div>

            <div className="content">
                <h2 className='mb-3 text-start'>Add Menu</h2>

                <Form>
                    <div className="row">
                        <div className="col">
                            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                                <Form.Label >Menu Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter menu Name" value={menu_name} onChange={(e) => setmenuname(e.target.value)} />
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <label for="formFile" className="form-label">Menu Image</label>
                            <input className="form-control" type="file" id="formFile" onChange={
                                (e) => {
                                    let file = e.target.files[0];
                                    setmenuImage(file)

                                }
                            } />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                                <Form.Label>Menu Type</Form.Label>
                                <Form.Control type="text" placeholder="Enter Menu type" value={menu_type} onChange={(e) => setmenutype(e.target.value)} />
                            </Form.Group>
                        </div>
                        <div className="col">
                            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                                <Form.Label>Menu price</Form.Label>
                                <Form.Control type="text" placeholder="Enter your menu price" value={menu_price} onChange={(e) => setmenuprice(e.target.value)} />
                            </Form.Group>
                        </div>
                        <div className="col">
                            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                                <Form.Label>Menu Rating</Form.Label>
                                <Form.Control type="text" placeholder="Enter Rating" value={menu_rating} onChange={(e) => setmenurating(e.target.value)} />
                            </Form.Group>
                        </div>
                    </div>



                    <Button variant="primary" type="submit" onClick={handleMenu}>
                        Submit
                    </Button>
                </Form>

                <h2 className='mt-5 mb-3 text-start'>Menu Details</h2>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Menu Name</th>
                            <th>Menu Type</th>
                            <th>Menu price</th>
                            <th>Menu Rating</th>
                            <th>Menu Image</th>

                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            menuList.map((menu) => (
                                <tr key={menu.Id}>
                                    <td>{menu.Id}</td>
                                    <td>{menu.menu_name}</td>

                                    <td>{menu.menu_type}</td>
                                    <td>{menu.menu_price}</td>
                                    <td>{menu.menu_rating}</td>
                                    <td>{menu.menu_Image}</td>
                                    <td><Button variant="primary" onClick={()=>openModal(menuList)}>Edit</Button></td>
                                    <td><Button variant="danger" onClick={handleDelete}>Delete</Button></td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>
                <div className="modal">
                    <Modal show={modelIsOpen} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Room</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group
                                    className="mb-3 text-start"
                                    controlId="formBasicEmail"
                                >
                                    <Form.Label>Room Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter room name"
                                        value={menu_rating}
                                        onChange={(e) => setmenurating(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3 text-start"
                                    controlId="formBasicEmail"
                                >
                                    <Form.Label>Room Price</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter room price"
                                        value={menu_type}
                                        onChange={(e) => setmenutype(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3 text-start"
                                    controlId="formBasicEmail"
                                >
                                    <Form.Label>Room Capacity</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter room capacity"
                                        value={menu_rating}
                                        onChange={(e) => setmenurating(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3 text-start"
                                    controlId="formBasicEmail"
                                >
                                    <Form.Label>Room No.</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter room number"
                                        value={menu_price}
                                        onChange={(e) => setmenuprice(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3 text-start"
                                    controlId="formBasicEmail"
                                >
                                    <Form.Label>Menu</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter room description"
                                        value={menu_name}
                                        onChange={(e) => setmenuname(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={handleEdit}>
                                    Update Menu
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default MenuDash;