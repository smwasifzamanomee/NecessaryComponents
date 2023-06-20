import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { registerOrg } from "../../client";
import EmailValidationHelper from '../../components/helpers/EmailValidationHelper';
import { useRouter } from 'next/router';
// import { useSession } from "next-auth/react";
const index = () => {
    const formArray = [1, 2, 3, 4, 5];
    const [formNo, setFormNo] = useState(formArray[0])

    //desctucturing state
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [organization_email, setOrganizationEmail] = useState('');
    const [organization_name, setOrganizationName] = useState('');
    const [organization_phone, setOrganizationPhone] = useState('');
    const [organization_address, setOrganizationAddress] = useState('');
    const [bank_name, setBankName] = useState('');
    const [bank_account_number, setBankAccountNumber] = useState('');
    const [license_number, setLicenseNumber] = useState('');
    const [license_file, setLicenseFile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [warning, setWarning] = useState(true);
    const [validated, setValidated] = useState(false);
    // const [formvalue, setFormValue] = useState({})

    // const { data } = useSession();
    // console.log(data);

    const [warningText, setWarningText] = useState({
        email: "",
        password: "",
        phone: "",
    });
    const styles = `appearance-none block w-full px-5 py-4 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg   ${warning
        ? "focus:border-red-500  focus:ring-red-500"
        : "focus:border-green-600  focus:ring-green-600"
        } focus:outline-none focus:ring focus:ring-opacity-40`;

    // Validate Password
    const validatePassword = () => {
        setWarning(true);
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (passwordRegex.test(password)) {
            setPassword(password);
            setWarning(false);
            return true
        } else {
            setWarning(true);
            return false
        }
    };
    // Validate Confirm Password
    const validateConfirmPassword = () => {
        setWarning(true);
        if (confirmPassword === password) {
            setWarningText({
                password: "",
            });
            setWarning(false);
            return true
        } else {
            setWarning(true);
            setWarningText({
                password: "Passwords must be 8 characters long and contain at least one uppercase letter, one lowercase letter and one number.",
            });
            return false
        }
    };
    // Validate Number
    const validateNumber = () => {
        const part1 = phone.slice(0, 3);
        const part2 = phone.slice(3);
        const numberRegex = /^[0-9]{10}$/;
        const patternRegex = /(\+44)|(\+33)/;
        if (numberRegex.test(part2) && patternRegex.test(part1)) {
            setWarning(false);
            return true
        } else {
            setWarning(true);
            return false
            // setPhone("");
        }
    };
    // Validate Email
    const validateEmail = () => {
        if (EmailValidationHelper(email)) {
            setWarning(false);
            return true

        } else {
            setWarning(true);
            return false
        }
    };

    // file upload handler
    const handlefile = (e) => {
        setLicenseFile(e.target.files[0])
    }

    // form submit handler
    const hanndleOrgRegister = async (e) => {

        e.preventDefault();
        const userDetails = {
            email,
            first_name,
            last_name,
            phone,
            address,
            organization_email,
            organization_name,
            organization_phone,
            organization_address,
            bank_name,
            bank_account_number,
            license_number,
            license_file,
            password,
        }

        // const file = license_file
        // const reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onload = () => {
        //     console.log("file",reader.result);
        // };
        // reader.onerror = (error) => {
        //     console.log('Error: ', error);
        // };

        console.log(userDetails)

        const form = new FormData();

        form.append('first_name', first_name);
        form.append('last_name', last_name);
        form.append('phone', phone);
        form.append('address', address);
        form.append('email', email);
        form.append('password', password);
        form.append('organization_email', organization_email);
        form.append('organization_name', organization_name);
        form.append('organization_phone', organization_phone);
        form.append('organization_address', organization_address);
        form.append('bank_name', bank_name);
        form.append('bank_account_number', bank_account_number);
        form.append('license_number', license_number);
        form.append('license_file', license_file);

        // api call

        const res = registerOrg(form);
        res.then((data) => {
            console.log(data.status)
            // toast.success('Organization Registered Successfully')
            if (data.status === 201) {
                router.push({
                    pathname: "/registration/verify",
                    query: { user_id: data?.data?.id },
                });
            }

        }).catch((err) => {
            console.log(err)
            toast.error(err)
        }
        )
    }
    // step 1 validation function

    const getvalidated = () => {
        console.log('validated')
        if (validateEmail() && validateNumber() && validatePassword() && validateConfirmPassword()) {
            setValidated(true)
            next()
        } else {
            toast.error('Please fillup all valid input fields')
        }

    }


    // next button function

    const next = () => {
        if (formNo === 1 && email && password && phone && confirmPassword) {
            setFormNo(formNo + 1)
        }
        else if (formNo === 2 && first_name && last_name && address) {
            setFormNo(formNo + 1)
        }
        else if (formNo === 3 && organization_email && organization_name && organization_phone && organization_address) {
            setFormNo(formNo + 1)
        } else if (formNo === 4 && bank_name && bank_account_number) {
            setFormNo(formNo + 1)
        }
        else {
            toast.error('Please fillup all valid input fields')
        }
    }

    // previous button function

    const pre = () => {
        setFormNo(formNo - 1)
    }

    // local storage
    // useEffect(() => {
    //     const data = localStorage.getItem('formvalues')
    //     if (data) {
    //         setFormValue({ ...JSON.parse(data) })
    //     }
    // },[])

    // useEffect(() => {
    //     localStorage.setItem('formvalues', JSON.stringify({ email, phone, password }))
    // },[email, phone, password])

    // console.log("formvalues", formvalue);

    // const test = formArray.map((v, i) => console.log(v, i))

    return (
        <div className=" h-screen lg:flex lg:justify-center lg:mt-8 lg:mb-20 xl:mb-24 lg:items-center md:flex md:justify-center md:items-center md:mt-6 md:mb-8 sm:flex sm:justify-center sm:items-center sm:mt-20 sm:mb-16">
            <div className="card lg:w-[600px] lg:h-[800px] w-[300px] h-[800px]
            md:w-[500px] md:h-[800px] rounded-md shadow-md bg-state-200 p-5">

                {/* form section */}

                <form onSubmit={hanndleOrgRegister}>
                    <div className='flex justify-center items-center lg:mt-12 mt-12'>
                        {
                            formArray.map((v, i) => (<>
                                <div
                                    className={`w-[35px] sm:w-[65px] my-3 text-white rounded-full ${formNo - 1 === i || formNo - 1 === i + 1 || formNo - 1 === i + 2 || formNo - 1 == i + 3 || formNo === formArray.length ? 'bg-black' : 'bg-primary'} h-[35px] flex justify-center items-center`}>
                                    {v}
                                </div>
                                {
                                    i !== formArray.length - 1 && <div className={`w-[85px] h-[2px] ${formNo === i + 2 || formNo === i + 3 || formNo == i + 4 || formNo === formArray.length ? 'bg-black' : 'bg-primary'}`}></div>
                                }
                            </>))
                        }
                    </div>
                    {/* Owner Contact Information page */}

                    {
                        formNo === 1 && <div><p className='text-center text-gray-500 text-xl font-bold py-4'>Owner Contact Information</p>
                            <div className='flex flex-col mb-2'>
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' placeholder='example@gmail.com' id='email' className={styles} required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='flex flex-col mb-2'>
                                <label htmlFor="phone">Phone</label>
                                <input type="text" name='phone' placeholder='+33 or +44 XXXXXXXXXX' id="phone" className={styles} required value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className='flex flex-col mb-2'>
                                <label htmlFor="password">Password</label>
                                <input className={styles} type="password" name='password' placeholder='password' id='password1' required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='flex flex-col mb-2'>
                                <label htmlFor="password">Confirm Password</label>
                                <input className={styles} type="password" name='password2' placeholder='retype password' id='password2' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className="flex flex-col h-24 pt-8 pl-2">
                                <p className="text-red-500"> {warningText.password}</p>
                                <p className="text-red-500"> {warningText.email}</p>
                                <p className="text-red-500"> {warningText.phone}</p>
                            </div>
                            <div className='mt-4 sm:mt-10 flex justify-center items-center'>
                                <button onClick={getvalidated} className='px-3 py-2 text-lg rounded-md w-full text-white bg-primary'>Next</button>
                            </div>

                        </div>
                    }
                    {/* Owner basic Information page  */}
                    {
                        formNo === 2 && <div><p className='text-center  text-gray-500 text-xl font-bold py-4'>Owner Basic Information</p>
                            <div className='flex flex-col mb-2'>
                                <label htmlFor="first_name">First Name</label>
                                <input value={first_name} onChange={(e) => setFirstName(e.target.value.toUpperCase())} className='appearance-none block w-full px-5 py-4 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg ' type="text" name='first_name' placeholder='first name' id='first_name' required />
                            </div>
                            <div className='flex flex-col mb-2'>
                                <label htmlFor="last_name">Last Name</label>
                                <input value={last_name} onChange={(e) => setLastName(e.target.value.toUpperCase())} className='appearance-none block w-full px-5 py-4 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg ' type="text" name='last_name' placeholder='last name' id='last_name' required />
                            </div>
                            <div className='flex flex-col mb-2'>
                                <label htmlFor="address">Address</label>
                                <input value={address} onChange={(e) => setAddress(e.target.value)} className='appearance-none block w-full px-5 py-4 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg ' type="text" name='address' placeholder='address' id='address' required />
                            </div>
                            <div className="flex flex-col h-24 pt-8 pl-2">

                            </div>
                            <div className='mt-4 gap-3 flex justify-center items-center'>
                                <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-primary'>Previous</button>
                                <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-primary'>Next</button>
                            </div>
                        </div>
                    }

                    {/* Organization Information page */}

                    {
                        formNo === 3 && <div><p className='text-center  text-gray-500 text-xl font-bold py-4'>Organization Information</p>
                            <div className='flex flex-col mb-2'>
                                <label htmlFor="organization_email">Organization Email</label>
                                <input value={organization_email} onChange={(e) => setOrganizationEmail(e.target.value)} className='appearance-none block w-full px-5 py-4 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg ' type="email" name='organization_email' placeholder='organization email' id='organization_email' required />
                            </div>
                            <div className='flex flex-col mb-2'>
                                <label htmlFor="organization_name">Organization Name</label>
                                <input value={organization_name} onChange={(e) => setOrganizationName(e.target.value.toUpperCase())} className='appearance-none block w-full px-5 py-4 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg ' type="text" name='organization_name' placeholder='organization name' id='organization_name' required />
                            </div>

                            <div className='flex flex-col mb-2'>
                                <label htmlFor="organization_address">Organization Address</label>
                                <input value={organization_address} onChange={(e) => setOrganizationAddress(e.target.value)} className='appearance-none block w-full px-5 py-4 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg ' type="text" name='organization_address' placeholder='organization address' id="organization_address" required />
                            </div>

                            <div className='flex flex-col mb-2'>
                                <label htmlFor="organization_phone">Organization Phone</label>
                                <input value={organization_phone} onChange={(e) => setOrganizationPhone(e.target.value)} className='appearance-none block w-full px-5 py-4 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg ' type="text" name='organization_phone' placeholder='XXXXXXXXXX' id="organization_phone" required />
                            </div>
                            <div className="flex flex-col h-24 pt-8 pl-2">

                            </div>
                            <div className='mt-4 gap-3 flex justify-center items-center'>
                                <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-primary'>Previous</button>
                                <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-primary'>Next</button>
                            </div>
                        </div>
                    }
                    {/* Bank account Information */}

                    {
                        formNo === 4 && <div> <p className='text-center  text-gray-500 text-xl font-bold py-4'>Bank Account Information</p>
                            <div className='flex flex-col mb-2'>
                                <label htmlFor="bank_name">Bank Name</label>
                                <input value={bank_name} onChange={(e) => setBankName(e.target.value.toUpperCase())} className='appearance-none block w-full px-5 py-4 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg ' type="text" name='bank_name' placeholder='bank name' id='bank_name' required />
                            </div>
                            <div className='flex flex-col mb-2'>
                                <label htmlFor="bank_account_number">Bank Account Number</label>
                                <input value={bank_account_number} onChange={(e) => setBankAccountNumber(e.target.value)} className='appearance-none block w-full px-5 py-4 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg' type="text" name='bank_account_number' placeholder='bank account number' id='bank_account_number' required />
                            </div>

                            <div className="flex flex-col h-24 pt-8 pl-2">

                            </div>
                            {/* <div className='flex flex-col mb-2'>
                                <label htmlFor="password">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-black rounded-md' type="password" name='password' placeholder='password' id='password' required />
                            </div> */}
                            <div className='mt-4 gap-3 flex justify-center items-center'>
                                <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-primary'>Previous</button>
                                <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-primary'>Next</button>
                            </div>
                        </div>
                    }
                    {/* License Information */}

                    {
                        formNo === 5 && <div> <p className='text-center  text-gray-500 text-xl font-bold py-4'>License Information</p>

                            <div className='flex flex-col mb-2'>
                                <label htmlFor="license_number">License Number</label>
                                <input value={license_number} onChange={(e) => setLicenseNumber(e.target.value)} className='appearance-none block w-full px-5 py-4 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg' type="text" name='license_number' placeholder='license number' id='license_number' required />
                            </div>
                            <div className='flex flex-col mb-2'>
                                <label htmlFor="license_file">License File</label>
                                <input
                                    // value={license_file} 
                                    onChange={handlefile} className='appearance-none block w-full px-5 py-4 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg' type="file" name='license_file' placeholder='license file' id='license_file' />
                            </div>
                            <div className="flex flex-col h-24 pt-8 pl-2">

                            </div>
                            <div className='mt-4 gap-3 flex justify-center items-center'>
                                <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-primary'>Previous</button>
                                <button type='submit' className='px-3 py-2 text-lg rounded-md w-full text-white bg-primary'>Submit</button>
                            </div>
                        </div>
                    }
                </form>

            </div>
        </div>
    );
}

export default index;
