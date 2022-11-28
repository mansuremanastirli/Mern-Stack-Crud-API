import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from "react-bootstrap"
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Alert } from 'react-bootstrap';


const Modals = () => {

    const [data, setData] = useState([])

    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const [showAlertDanger, setAlertDanger] = useState(false)
    const [showAlertSuccess, setAlertSuccess] = useState(false)

    const [modalSuccessMessage, setmodalSuccessMessage] = useState(false)
    const [modalErrorMessage, setmodalErrorMessage] = useState(false)

    const [showAlertModalDanger, setshowAlertModalDanger] = useState(false)
    const [showAlertModalSuccess, setAlertModalSuccess] = useState(false)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        title: "",
        comment: ""
    })

    const [updatedPost, setupdatedPost] = useState({
        title: "",
        comment: "",
    })

    // updatePost methoduyla hali hazırda vaar olan postu aldım updatedpost stateine attım (su anki hali boş) artık boş bi title comment oldu (boş string) boş stringi de modal da ki textboxlarla doldurdum ve server a attım
    const updatePost = (item) => {
        handleShow()
        setupdatedPost(item)

    }

    // saveUpdatedPost Methoduyla id yoluyla server a updatedPost statesini gönderiyorum
    const saveUpdatedPost = (e) => {
        
        axios.put(`http://localhost:5000/posts/update/${updatedPost._id}`, updatedPost).then(res => {
            console.log(res.data)
            setmodalSuccessMessage(res.data.message)
            setAlertModalSuccess(true)
            setTimeout(() => {
                setAlertModalSuccess(false)
            }, 3000);
        }).catch(err => {
            setmodalErrorMessage(err.response.data.message)
            setshowAlertModalDanger(true)
            setTimeout(() => {
                setshowAlertModalDanger(false)
            }, 3000);
        })

    }


    useEffect(() => {
        axios.get("http://localhost:5000/posts/getposts").then(res => {
            setData(res.data)
        })
    }, [])

    const createPost = () => {
        axios.post("http://localhost:5000/posts", formData).then(res => {
            
            setSuccessMessage(res.data.message)
            setAlertSuccess(true)
            setTimeout(() => {
                setAlertSuccess(false)
            }, 3000);
            
            
        }).catch(err => {

            setErrorMessage(err.response.data.message)
            setAlertDanger(true)
            setTimeout(() => {
                setAlertDanger(false)
            }, 3000);
        })


    }
    const deletePost = (id) => {
        axios.delete(`http://localhost:5000/posts/delete/${id}`).then(res => {
        })
    }



    useEffect(() => {
        axios.get("http://localhost:5000/posts/getposts").then(res => {
            setData(res.data)
        })
    }, [createPost])




    return (
        <div>

            <Alert className='alert-danger text-center mx-auto w-50' show={showAlertDanger} style={{ margin: "15px" }} >
                {errorMessage}
            </Alert>
            <Alert className='alert-success text-center mx-auto w-50' show={showAlertSuccess} style={{ margin: "15px" }} >
                {successMessage}
            </Alert>

            <Form>
                <Form.Group className="mx-auto" >
                    <Form.Control style={{ margin: "30px" }} className='mx-auto w-50' type="text" placeholder="title" onChange={e => setFormData({ ...formData, title: e.target.value })} />
                </Form.Group>
                <Form.Group className="mx-auto w-50 ">
                    <Form.Control type="text" placeholder="comment" onChange={e => setFormData({ ...formData, comment: e.target.value })} />
                </Form.Group>
                <Button className='btn btn-success w-50' onClick={createPost} style={{ position: "relative", left: "385px", top: "20px" }} >
                    Blog Oluştur
                </Button>
            </Form>
            <br />
            <br />
            <br />




            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>Update Blog</Modal.Header>
                <Alert className='alert-danger text-center mx-auto w-50' show={showAlertModalDanger} style={{ margin: "15px" }} >
                    {modalErrorMessage}
                </Alert>

                <Alert className='alert-success text-center mx-auto w-50' show={showAlertModalSuccess} style={{ margin: "15px" }} >
                    {modalSuccessMessage}
                </Alert>

                <Modal.Body>
                    <Form>
                        <Form.Group style={{ margin: "10px" }} className="mx-auto w-50 ">
                            <Form.Control name="title" placeholder="title" defaultValue={formData.title ? updatedPost.title : ""} onChange={e => setupdatedPost({ ...updatedPost, title: e.target.value })} type="text" />
                        </Form.Group>
                        <Form.Group className="mx-auto w-50 ">
                            <Form.Control name="comment" placeholder="comment" defaultValue={formData.comment ? updatedPost.comment : ""} onChange={e => setupdatedPost({ ...updatedPost, comment: e.target.value })} type="text" />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='mx-auto' onClick={() => saveUpdatedPost()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {data.map(item => <Card key={item._id} style={{ width: '18rem', float: "left" }}>
                <Card.Header>{new Date(item.time).toLocaleString() }</Card.Header>
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <hr />
                    <Card.Text>
                        {item.comment}
                    </Card.Text>
                    <hr />
                    <Button className='btn btn-danger' onClick={() => deletePost(item._id)}>Delete Post</Button> <Button onClick={() => updatePost(item)}>Update Post</Button>
                </Card.Body>
            </Card>)}
        </div>
    )
}

export default Modals





