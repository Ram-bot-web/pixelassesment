export const CustomerModal = ({ isAddCustomer, isViewCustomer, inputData, handleInputChange, handleSubmit }) => {
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasCustomer" aria-labelledby="offcanvasCustomerLabel">
            <div className="offcanvas-header p-4">
                <div id="offcanvasRightLabel" className="margin-bottom-0 head-style">{isAddCustomer ? "New Customer" : inputData?.fullName}</div>
                <button type="button" className="btn-close text-reset shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body px-4 pt-0">
                <div className="row">
                    <div className="col-12 mb-2">
                        <label>PAN</label>{isViewCustomer !== true && <span className="required-color star-space">*</span>}<br />
                        <input type="text" disabled={isViewCustomer} maxLength={10} value={inputData?.panNumber} className="form-control w-100 rounded-0 mt-1" onChange={(e) => handleInputChange(e, "panNumber")} />
                    </div>
                    <div className="col-12 mb-2">
                        <label>Full Name</label>{isViewCustomer !== true && <span className="required-color star-space">*</span>}<br />
                        <input type="text" disabled={isViewCustomer} maxLength={140} value={inputData?.fullName} className="form-control w-100 rounded-0 mt-1" onChange={(e) => handleInputChange(e, "fullName")} />
                    </div>
                    <div className="col-12 mb-2">
                        <label>Email</label>{isViewCustomer !== true && <span className="required-color star-space">*</span>}<br />
                        <input type="text" disabled={isViewCustomer} maxLength={255} value={inputData?.email} className="form-control w-100 rounded-0 mt-1" onChange={(e) => handleInputChange(e, "email")} />
                    </div>
                    <div className="col-12 mb-2">
                        <label>Mobile Number</label>{isViewCustomer !== true && <span className="required-color star-space">*</span>}<br />
                        <div className="d-flex"><span className="prefix mt-1">+91</span>
                            <input type="number" disabled={isViewCustomer} maxLength={10} value={inputData?.phoneNumber} className="form-control w-100 rounded-0 mt-1" onChange={(e) => handleInputChange(e, "phoneNumber")} />
                        </div>
                    </div>
                    <div className="col-12 mb-2">
                        <label>Address Line 1</label>{isViewCustomer !== true && <span className="required-color star-space">*</span>}<br />
                        <input type="text" disabled={isViewCustomer} value={inputData?.addressLine1} className="form-control w-100 rounded-0 mt-1" onChange={(e) => handleInputChange(e, "addressLine1")} />
                    </div>
                    <div className="col-12 mb-2">
                        <label>Address Line 2</label><br />
                        <input type="text" disabled={isViewCustomer} value={inputData?.addressLine2} className="form-control w-100 rounded-0 mt-1" onChange={(e) => handleInputChange(e, "addressLine2")} />
                    </div>
                    <div className="col-12 mb-2">
                        <label>Post Code</label>{isViewCustomer !== true && <span className="required-color star-space">*</span>}<br />
                        <input type="number" disabled={isViewCustomer} value={inputData?.postCode} className="form-control w-100 rounded-0 mt-1" onChange={(e) => handleInputChange(e, "postCode")} />
                    </div>
                    <div className="col-12 mb-2">
                        <label>State</label><br />
                        <input type="text" disabled={true} value={inputData?.state} className="form-control w-100 rounded-0 mt-1" onChange={(e) => handleInputChange(e, "state")} />
                    </div>
                    <div className="col-12 mb-2">
                        <label>City</label><br />
                        <input type="text" disabled={true} value={inputData?.city} className="form-control w-100 rounded-0 mt-1" onChange={(e) => handleInputChange(e, "city")} />
                    </div>
                    {isViewCustomer !== true &&
                        <div className="col-12 mt-2">
                            <button type='button' className='action-button px-3 py-2' onClick={() => handleSubmit()}>{isAddCustomer ? "Submit" : "Update"}</button>
                            <button type='button' className='cancel-button px-3 py-2 cancel-space' id="cancelModal" data-bs-dismiss="offcanvas">Cancel</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}