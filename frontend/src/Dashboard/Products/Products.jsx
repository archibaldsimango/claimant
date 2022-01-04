import React, { useEffect, useRef, useState } from 'react'
import DashboardLayout from '../../Layout/DashboardLayout'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import InfoSharpIcon from '@material-ui/icons/InfoSharp';
import { Avatar } from '@material-ui/core';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone'
import axios from 'axios';
// import AttachFileIcon from '@material-ui/icons/AttachFile';



//material ui styles for components
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    paper: {
        position: 'absolute',
        width: '80%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #fff',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

//function to get the styles above 
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

//produnts component
//this one is very big
function Products() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    //for adding product
    const [name, setName] = useState('')
    const [descritpion, setDescription] = useState('')
    const [barcode, setBarcode] = useState('')
    const [sku, setSku] = useState('')
    const [quantity, setQuantity] = useState('')
    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [category, setCategory] = useState('')
    // const [status, setStatus] = useState('')
    const [picture, setPicture] = useState(null)
    const [previewSrc, setPreviewSrc] = useState('')
    const [isPreviewAvailable, setIsPreviewAvailable] = useState(false)
    // const [errorMsg, setErrorMsg] = useState('')
    const dropRef = useRef();



    //fumction for adding new product
    const addProduct = async (e) => {
        e.preventDefault()
        try {
            const data = new FormData()
            data.append("name", name)
            data.append('description', descritpion)
            data.append('barcode', barcode)
            data.append('sku', sku)
            data.append('quantity', quantity)
            data.append('price', price)
            data.append('discount', discount)
            data.append('brand', brand)
            data.append('category', category)
            data.append('drugPictures', picture)

            const response = await fetch(`http://localhost:5050/api/v1/drug/add`, {
                method: "POST",
                mode: 'cors',
                headers: {
                    // 'Content-Type': `multipart/form-data`,
                    'Authorization': localStorage.getItem('token'),
                },
                body: data
            });
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }


    //finction for deleting the product
    // const deleteProduct = (e) =>{
    //     e.preventDefault()
    // }
    const onDrop = (files) => {
        const [uploadedFile] = files;
        setPicture(uploadedFile);
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewSrc(fileReader.result);
        };
        fileReader.readAsDataURL(uploadedFile);
        setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    };


    //opening modal
    const handleOpen = () => {
        setOpen(true);
    };

    //closing modal
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <DashboardLayout>
                <div className="bg-white rounded flex flex-col">
                    <div className="products__header flex flex-row p-4 items-center mb-4">
                        <div className="search border-2 border-gray-200 rounded p-2 flex flex-row w-1/3">
                            <SearchRoundedIcon className="text-gray-400" />
                            <input type="text" placeholder="Search Inventory" className="outline-none bg-transparent" />
                        </div>
                        <div className="flex-1"></div>
                        <span onClick={handleOpen} className="flex items-center flex-row bg-blue-700 text-white rounded p-2 cursor-pointer">
                            <AddBoxRoundedIcon />
                            <p>Add Product</p>
                        </span>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >

                            {/* modal to add products */}
                            <div style={modalStyle} className={classes.paper}>
                                {/* // eslint-disable-next-line */}
                                <p className="text-xl" id="simple-modal-title" className="text-gray-500 mb-4">New Product</p>
                                <div className="flex flex-row mb-4">
                                    <input
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        className="ouline-none border-2 border-gray-200 p-2 w-full mr-1 rounded" />
                                    <input
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}
                                        type="text"
                                        name="category"
                                        placeholder="Category"
                                        className="ouline-none border-2 border-gray-200 p-2 w-full mr-1 rounded" />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <input
                                        value={descritpion}
                                        onChange={e => setDescription(e.target.value)}
                                        placeholder="Description And Dosage"
                                        className="text-gray-500"
                                        className="ouline-none border-2 border-gray-200 p-2 w-full mr-1 rounded" />
                                </div>
                                <div className="border-b border-gray-300 w-full my-3"></div>
                                <div className="flex flex-col mb-4">
                                    <label htmlFor="pictures">Product Pictures</label>
                                    {/* //uploda the image */}
                                    <div className="upload-section flex flex-row nd:flex-col">
                                        <Dropzone onDrop={onDrop}>
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps({ className: 'drop-zone bg-gray-300 rounded outline-none cursor-pointer hover:bg-gray-500' })} ref={dropRef}>
                                                    <input {...getInputProps()} />
                                                    <p>Drag and drop a file OR click here to select a file</p>
                                                    {picture && (
                                                        <div>
                                                            <strong>Selected file:</strong> {picture.name}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </Dropzone>
                                        {previewSrc ? (
                                            isPreviewAvailable ? (
                                                <div className="image-preview">
                                                    <img className="preview-image w-48 ml-8" src={previewSrc} alt="Preview" />
                                                </div>
                                            ) : (
                                                    <div className="preview-message">
                                                        <p>No preview available for this file</p>
                                                    </div>
                                                )
                                        ) : (
                                                <div className="preview-message">
                                                    <p>Image preview will be shown here after selection</p>
                                                </div>
                                            )}
                                    </div>

                                </div>
                                <div className="border-b border-gray-300 w-full my-3"></div>
                                <div className="flex flex-row mb-4">
                                    <input
                                        value={barcode}
                                        onChange={e => setBarcode(e.target.value)}
                                        type="text"
                                        name="barcode"
                                        placeholder="Barcode"
                                        className="ouline-none border-2 border-gray-200 p-2 w-full mr-1 rounded" />
                                    <input
                                        value={sku}
                                        onChange={e => setSku(e.target.value)}
                                        type="text"
                                        name="sku"
                                        placeholder="SKU"
                                        className="ouline-none border-2 border-gray-200 p-2 w-full mr-1 rounded" />
                                </div>
                                <div className="flex flex-row mb-4">
                                    <input
                                        value={brand}
                                        onChange={e => setBrand(e.target.value)}
                                        type="text"
                                        name="brandname"
                                        placeholder="Brand"
                                        className="ouline-none border-2 border-gray-200 p-2 w-full mr-1 rounded" />
                                </div>
                                <div className="flex flex-row mb-4">
                                    <input
                                        value={quantity}
                                        onChange={e => setQuantity(e.target.value)}
                                        type="number"
                                        name="quantity"
                                        placeholder="Quantity"
                                        className="ouline-none border-2 border-gray-200 p-2 w-full mr-1 rounded" />
                                    <input
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                        type="number"
                                        name="price"
                                        placeholder="Price"
                                        className="ouline-none border-2 border-gray-200 p-2 w-full mr-1 rounded" />
                                    <input
                                        value={discount}
                                        onChange={e => setDiscount(e.target.value)}
                                        type="number"
                                        name="discoutPrice"
                                        placeholder="Discount"
                                        className="ouline-none border-2 border-gray-200 p-2 w-full mr-1 rounded" />
                                </div>
                                <div className="flex flex-row mb-4 justify-between">
                                    <button onClick={handleClose} className="bg-red-700 p-2 outline-none rounded border-none">Close</button>
                                    <button onClick={addProduct} className="bg-blue-700 p-2 outline-none rounded border-none">Save Product</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                    <>
                        <ProductTable />
                    </>

                </div>
            </DashboardLayout>
        </>
    )
}


//table showing all products
//request from backend done here also
const ProductTable = () => {

    const [products, setProduct] = useState()

    const user = localStorage.getItem('user')
    useEffect(() => {
        axios.get(`http://localhost:5050/api/v1/pharmacy/drugs/${JSON.parse(user).user_id}`, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
        }).then(res => {
            setProduct(res.data)
        });
    }, [user])

    console.log(products)

    return (
        <table>
            <thead>
                <tr className="bg-gray-200 text-sm text-gray-400 p-4">
                    <th className="py-4">Image</th>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Barcode</th>
                    <th>SKU</th>
                    <th>Info</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products?.map(product => (
                    <ProductComponent
                        key={product._id}
                        productname={product.name}
                        productdescription={product.descritpion}
                        productbarcode={product.barcode}
                        productsku={product.sku}
                        productquantity={product.quantity}
                        productprice={product.price}
                        productdiscount={product.discountPrice}
                        productbrand="CABS"
                        productcategory={product.category}
                        productpicture={`http://localhost:5050/${product.drugPictures[0].img}`}
                        productstatus={product.status}
                    />
                ))}
            </tbody>
        </table>
    )
}

const ProductComponent = ({ productname,
    productdescription,
    productbarcode,
    productsku,
    productquantity,
    productprice,
    productdiscount,
    productbrand,
    productcategory,
    productpicture,
    productstatus
}) => {
    const classes = useStyles();

    const [showEdit, setShowEdit] = React.useState(false);

    //for edidting info
    const [editname, setEditName] = useState('')
    const [editdescritpion, setEditDescription] = useState('')
    const [editbarcode, setEditBarcode] = useState('')
    const [editsku, setEditSku] = useState('')
    const [editquantity, setEditQuantity] = useState('')
    const [editprice, setEditPrice] = useState('')
    const [editdiscount, setEditDiscount] = useState('')
    const [editbrand, setEditBrand] = useState('')
    const [editcategory, setEditCategory] = useState('')
    // const [editstatus, setEditStatus] = useState('')
    const [editpicture, setEditPicture] = useState('')

    //function for editing the product
    const editProduct = (e) => {
        e.preventDefault()
        console.log(editpicture)
    }

    return (
        <tr className="text-sm text-center border-b border-gray-300">
            <td className="py-4 pl-1 flex flex-col items-center">
                <Avatar src={productpicture} variant="rounded" fontSize="small" className={classes.small} />
            </td>
            <td>{productname}</td>
            <td>{productcategory}</td>
            <td>{productbarcode}</td>
            <td>{productsku}</td>
            <td>
                <InfoSharpIcon fontSize="small" />
            </td>
            <td>{productquantity}</td>
            <td>{productstatus}</td>
            <td>
                <EditSharpIcon onClick={() => setShowEdit(true)} fontSize="small" className="bg-blue-200 cursor-pointer rounded text-blue-700 mr-1" />
                {showEdit ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            onClick={() => setShowEdit(false)}
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            Modal Title
                                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowEdit(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex flex-col">
                                        <div className="flex flex-row mb-4">
                                            <input
                                                value={editname}
                                                onChange={e => setEditName(e.target.value)}
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                className="ouline-none border-2 border-gray-200 p-2 w-full mr-1 rounded" />
                                            <input
                                                value={editcategory}
                                                onChange={e => setEditCategory(e.target.value)}
                                                type="text"
                                                name="category"
                                                placeholder="Category"
                                                className="ouline-none border-2 border-gray-200 p-2 w-full mr-1 rounded" />
                                        </div>
                                        <div className="flex flex-col mb-4">
                                            <ReactQuill
                                                value={editdescritpion}
                                                onChange={e => setEditDescription(e.target.value)}
                                                theme="snow"
                                                placeholder="Description And Dosage"
                                                className="text-gray-500" />
                                        </div>
                                        <div className="flex flex-col mb-4">
                                            <label htmlFor="pictures">Product Pictures</label>
                                            <input
                                                value={editpicture}
                                                onChange={e => setEditPicture(e.target.files[0])}
                                                type="file"
                                                name="pictures"
                                                id="pictures" />
                                        </div>
                                        <div className="flex flex-row mb-4">
                                            <input
                                                value={editbarcode}
                                                onChange={e => setEditBarcode(e.target.value)}
                                                type="text"
                                                name="barcode"
                                                placeholder="Barcode"
                                                className="ouline-none border-2 border-gray-200 p-2 w-full mr-1 rounded" />
                                            <input
                                                value={editsku}
                                                onChange={e => setEditSku(e.target.value)}
                                                type="text"
                                                name="sku"
                                                placeholder="SKU"
                                                className="ouline-none border-2 border-gray-200 p-2 w-full mr-1 rounded" />
                                        </div>
                                        <div className="flex flex-row mb-4">
                                            <input
                                                value={editbrand}
                                                onChange={e => setEditBrand(e.target.value)}
                                                type="text"
                                                name="brandname"
                                                placeholder="Brand"
                                                className="ouline-none border-2 border-gray-200 p-2 w-full mr-1 rounded" />
                                        </div>
                                        <div className="flex flex-row mb-4">
                                            <input
                                                value={editquantity}
                                                onChange={e => setEditQuantity(e.target.value)}
                                                type="number"
                                                name="quantity"
                                                placeholder="Quantity"
                                                className="ouline-none border-2 border-gray-200 p-2 w-full mr-1 rounded" />
                                            <input
                                                value={editprice}
                                                onChange={e => setEditPrice(e.target.value)}
                                                type="number"
                                                name="price"
                                                placeholder="Price"
                                                className="ouline-none border-2 border-gray-200 p-2 w-full mr-1 rounded" />
                                            <input
                                                value={editdiscount}
                                                onChange={e => setEditDiscount(e.target.value)}
                                                type="number"
                                                name="discoutPrice"
                                                placeholder="Discount"
                                                className="ouline-none border-2 border-gray-200 p-2 w-full mr-1 rounded" />
                                        </div>
                                        <div className="flex flex-row mb-4 justify-between">
                                            <button style={{ transition: "all .15s ease" }} onClick={() => setShowEdit(false)} className="bg-red-700 p-2 outline-none rounded border-none">Close</button>
                                            <button style={{ transition: "all .15s ease" }} onClick={editProduct} className="bg-blue-700 p-2 outline-none rounded border-none">Save Product</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
                <DeleteForeverRoundedIcon fontSize="small" className="bg-red-200 rounded text-red-700 ml-1" />
            </td>
        </tr>
    )
}

export default Products
