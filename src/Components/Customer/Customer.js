import React from "react";
import { CustomerModal } from "./CustomerModal";
import { customerDataInitial, customerDataErrorInitial, customerAddedText, confirmText, cancelText, alertText, confirmationText, customerDeletedText, mandatoryText, customerUpdatedText, panValidText, emailValidText, postCodeValidText } from "../../Common/Constants";
import { confirmationAlert, successAlert, warningAlert } from "../../Common/Alert";
import WithRouter from "../../Common/WithRouter";
import { connect } from "react-redux";
import { panCheckAPI, postalCodeAPI } from "../../Action/CustomerAction";
import { validateEmail, validatePAN } from "../../Common/CommonFunctions";

class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerDetailsData: JSON.parse(localStorage.getItem("customerDetails")),
            isAddCustomer: true,
            isViewCustomer: false,
            customerData: customerDataInitial,
            customerDataError: customerDataErrorInitial,
            customerId: 0
        }
    }

    handleAddScreen = () => {
        this.setState({
            ...this.state,
            isViewCustomer: false,
            isAddCustomer: true,
            customerData: customerDataInitial,
            customerDataError: customerDataErrorInitial
        })
        this.props.dispatch({ type: "GET_POSTCODE_DATA", data: [] })
    }

    handleInputChange = (e, str) => {
        let value = e.target.value;
        this.setState({
            ...this.state,
            customerData: {
                ...this.state.customerData,
                [str]: value
            }
        })
    }

    handleDelete = async (idToRemove) => {
        const result = await confirmationAlert(
            confirmationText,
            alertText,
            confirmText,
            cancelText
        );
        if (result) {
            let customerDetails = JSON.parse(localStorage.getItem("customerDetails"));
            const newArray = customerDetails.filter(item => item.id !== idToRemove);
            this.setState({
                ...this.state,
                customerDetailsData: newArray
            })
            localStorage.setItem("customerDetails", JSON.stringify(newArray));
            successAlert(customerDeletedText);
        }
    };

    handleEdit = (editId) => {
        let { customerDetailsData } = this.state;
        this.setState({
            ...this.state,
            isViewCustomer: false,
            isAddCustomer: false,
            customerId: editId,
            customerData: customerDetailsData.filter(item => item.id === editId)[0],
            customerDataError: customerDataErrorInitial
        })
        this.props.dispatch({ type: "GET_POSTCODE_DATA", data: [] })
    }

    handleView = (viewId) => {
        let { customerDetailsData } = this.state;
        this.setState({
            ...this.state,
            isViewCustomer: true,
            isAddCustomer: false,
            customerId: viewId,
            customerData: customerDetailsData.filter(item => item.id === viewId)[0],
            customerDataError: customerDataErrorInitial
        })
        this.props.dispatch({ type: "GET_POSTCODE_DATA", data: [] })
    }

    handleSubmit = async () => {
        let { dispatch } = this.props;
        let { isAddCustomer, customerData, customerId, customerDetailsData } = this.state;
        dispatch({ type: 'LOADER_DATA', data: true });
        if (customerData.postCode !== "") {
            await this.props.dispatch(postalCodeAPI(customerData.postCode));
        }
        if (customerData.panNumber !== "") {
            await this.props.dispatch(panCheckAPI(customerData.panNumber));
        }
        const checkValid = this.checkValidations();
        if (checkValid) {
            if (isAddCustomer === true) {
                let customerDetails = JSON.parse(localStorage.getItem("customerDetails"));
                let data = customerDetails || [];
                if (customerDetails === null || customerDetails === "" || customerDetails === undefined) {
                    let obj = customerData;
                    obj.id = 1;
                    this.setState({
                        ...this.state,
                        customerData: obj
                    })
                    data.push(obj)
                    this.updateCustomerData(data);
                } else {
                    let obj = customerData;
                    obj.id = customerDetails.length + 1;
                    this.setState({
                        ...this.state,
                        customerData: obj
                    })
                    data.push(obj)
                    this.updateCustomerData(data);
                }
                successAlert(customerAddedText);
            } else {
                let updatedArray = customerDetailsData.map(obj => obj.id === customerId ? customerData : obj);
                this.updateCustomerData(updatedArray);
                successAlert(customerUpdatedText);
            }
            dispatch({ type: 'LOADER_DATA', data: false });
        } else {
            dispatch({ type: 'LOADER_DATA', data: false });
        }
    }

    checkValidations = () => {
        let { customerData } = this.state;
        if (customerData.panNumber === "" || customerData.fullName === "" || customerData.email === "" || customerData.phoneNumber === "" || customerData.addressLine1 === "" || customerData.postCode === "") {
            warningAlert(mandatoryText);
        } else if (this.props.isPanValid !== true || validatePAN(customerData.panNumber) === false) {
            warningAlert(panValidText)
        } else if (validateEmail(customerData.email) === false) {
            warningAlert(emailValidText)
        } else if (customerData.city === "") {
            warningAlert(postCodeValidText)
        } else {
            return true;
        }
    }

    componentDidUpdate() {
        if (this.props.postCodedata?.length !== 0) {
            if (this.props.postCodedata?.city[0]?.name !== this.state.customerData?.city) {
                this.setState({
                    customerData: {
                        ...this.state.customerData,
                        city: this.props.postCodedata?.city[0]?.name
                    }
                });
            }
            if (this.props.postCodedata?.state[0]?.name !== this.state.customerData?.state) {
                this.setState({
                    customerData: {
                        ...this.state.customerData,
                        state: this.props.postCodedata?.state[0]?.name
                    }
                });
            }
        }
    }

    updateCustomerData = (data) => {
        this.setState({
            ...this.state,
            customerDetailsData: data,
            customerData: customerDataInitial,
            customerDataError: customerDataErrorInitial
        })
        localStorage.setItem("customerDetails", JSON.stringify(data));
        document.getElementById("cancelModal").click();
    }

    render() {
        let { customerDetailsData } = this.state;
        return (
            <div className="container-fluid mt-5 px-5 position-absolute">
                <div className='row'>
                    <div className='col-6'>
                        <h5 className='fw-bold mb-0'>Customer details</h5>
                    </div>
                    <div className='col-6 d-flex justify-content-end'>
                        <button type='button' className='action-button add-height px-2' data-bs-toggle="offcanvas" data-bs-target="#offcanvasCustomer" onClick={() => this.handleAddScreen()}><i className="bi bi-plus"></i>Add</button>
                    </div>
                    <div className='col-12'>
                        <div className="table-responsive mt-3">
                            <table className="table table-bordered" id="customerTable">
                                <thead className="thead-style">
                                    <tr>
                                        <th width="23%">PAN</th>
                                        <th width="23%">Full Name</th>
                                        <th width="23%">Email</th>
                                        <th width="23%">Mobile Number</th>
                                        <th width="8%" className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customerDetailsData && customerDetailsData?.length > 0 ?
                                        customerDetailsData?.map((item, index) => (
                                            <tr key={"row" + index}>
                                                <td className='align-middle'>{item.panNumber && item.panNumber}</td>
                                                <td className='align-middle'>{item.fullName && item.fullName}</td>
                                                <td className='align-middle'>{item.email && item.email}</td>
                                                <td className='align-middle'>{item.phoneNumber && item.phoneNumber}</td>
                                                <td className="align-middle text-center gap-3">
                                                    <i className="bi bi-eye cursor-pointer" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCustomer" onClick={() => this.handleView(item.id)}></i>
                                                    <i className="bi bi-pencil-square cancel-space cursor-pointer" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCustomer" onClick={() => this.handleEdit(item.id)}></i>
                                                    <i className="bi bi-trash cancel-space icon-color cursor-pointer" onClick={() => this.handleDelete(item.id)}></i>
                                                </td>
                                            </tr>
                                        ))
                                        :
                                        <tr>
                                            <td className='align-middle text-center' colSpan={5}>No data found</td>
                                        </tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <CustomerModal
                    isViewCustomer={this.state.isViewCustomer}
                    isAddCustomer={this.state.isAddCustomer}
                    inputData={this.state.customerData}
                    handleInputChange={(e, str) => this.handleInputChange(e, str)}
                    handleSubmit={() => this.handleSubmit()}
                />
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

function mapStateToProps(state) {
    return {
        postCodedata: state.CustomerReducer.postCodedata || [],
        isPanValid: state.CustomerReducer.isPanValid || false
    };
}

export default WithRouter(
    connect(mapStateToProps, mapDispatchToProps)(Customer)
);
