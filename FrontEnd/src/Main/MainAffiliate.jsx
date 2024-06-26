import './main.css'
import './main-affiliate.css'
import { Link, useNavigate} from "react-router-dom"
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export function MainAffiliate(){


    const navigate = useNavigate();

    const [oneNavClass, setOneNavClass] = useState('');
    const [twoNavClass, setTwoNavClass] = useState('');
    const [threeNavClass, setThreeNavClass] = useState('active');
    const [fourNavClass, setFourNavClass] = useState('');

    const [affiliateName, setAffiliateName] = useState('')
    const [productLink, setProductLink] = useState('')
    const [affiliateDescription, setAffiliateDescription] = useState('')
    const [price, setPrice] = useState('')
    const [commissionRate, setCommissionRate] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [autoApprove, setAutoApprove] = useState(false)

    const [copyLink, setCopyLink] = useState('')

    const [data, setData] = useState([]);
    const [dataLength, setdataLength] = useState();


    const [BackgroundColor, setBackgroundColor] = useState('#ffffff');
    const [TextColor, setTextColor] = useState('#3b3b3b');
    const [ButtonColor, setButtonColor] = useState('#3b3b3b');
    const [ButtonTextColor, setButtonTextColor] = useState('#ffffff');
    const [HeadlineText, setHeadlineText] = useState('Default handle');
    const [EmailSentText, setEmailSentText] = useState('Default email sent text');

    const [ShowSingleAffiliate, setShowSingleAffiliate] = useState(false);
    const [showIndex, setShowIndex] = useState(0);

    const [podLinks, setPodLinks] = useState('pod-links disabled');



    let id;

    if(localStorage.getItem('id') === null){
        window.location.href = '/login';
    } else{
        id = localStorage.getItem('id');
    }

    useEffect(() => {
        const getLinks = async () => {
            await axios.post('http://localhost:3000/affiliateLinks', {
                id
            })
            .then(res => {
                setData(res.data)
                setdataLength(res.data.length)
            })
            .catch(err => {
                console.log(err)
            })
        };
    
        getLinks();
    }, []); 




    const [showPopup, setShowPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editIndex, setEditIndex] = useState();

    const linkPopup = () => {
        setShowPopup(!showPopup)
    }

    const editPopup = (index) => {
        setShowEditPopup(!showEditPopup)
        setEditIndex(index)
    }

    const handleChange = (e, field) => {
        const newData = [...data];
        newData[editIndex][field] = e.target.value;
        setData(newData);
    }


    const CreateAffiliate = (e) => {
        e.preventDefault()
        console.log('Creating Affiliate')
        if( affiliateName !== '' && productLink !== '' && affiliateDescription !== '' && price !== '' && commissionRate !== '' && startDate !== '' && endDate !== ''){
            console.log(dataLength)
            axios.put('http://localhost:3000/affiliate', {
                affiliateName,
                productLink,
                affiliateDescription,
                price,
                commissionRate,
                startDate,
                endDate,
                id,
                linkNumber: dataLength,
                BackgroundColor,
                TextColor,
                ButtonColor,
                ButtonTextColor,
                HeadlineText,
                EmailSentText,
                autoApprove
            })
            .then(res => {
                console.log(res)
                setShowPopup(!showPopup);
                window.location.reload();
            })

            
        
    } 
}

const saveData = (e) => {
    e.preventDefault()
    console.log('Saving Data')
    if( data[editIndex].affiliateName !== '' && data[editIndex].productLink !== '' && data[editIndex].affiliateDescription !== '' && data[editIndex].price !== '' && data[editIndex].commissionRate !== '' && data[editIndex].startDate !== '' && data[editIndex].endDate !== ''){
        console.log(data[editIndex].affiliateName, data[editIndex].productLink, data[editIndex].affiliateDescription, data[editIndex].price, data[editIndex].commissionRate, data[editIndex].startDate, data[editIndex].endDate, id, editIndex)
        axios.put('http://localhost:3000/affiliateEdit', {
            affiliateName: data[editIndex].affiliateName,
            productLink: data[editIndex].productLink,
            affiliateDescription: data[editIndex].affiliateDescription,
            price: data[editIndex].price,
            commissionRate: data[editIndex].commissionRate,
            startDate: data[editIndex].startDate,
            endDate: data[editIndex].endDate,
            id,
            linkNumber: editIndex,
            BackgroundColor: data[editIndex].BackgroundColor,
            TextColor: data[editIndex].TextColor,
            ButtonColor: data[editIndex].ButtonColor,
            ButtonTextColor: data[editIndex].ButtonTextColor,
            HeadlineText: data[editIndex].HeadlineText,
            EmailSentText: data[editIndex].EmailSentText,
            affiliateUsers: data[editIndex].affiliateUsers
        })
        .then(res => {
            console.log(res)
            setShowEditPopup(!showEditPopup)
        })
    }

}


const navigateLink = async( name, index) => {
    console.log('clicked')
    await axios.post('http://localhost:3000/allData',{
        id
    })
    .then((res) => {
        // navigator.clipboard.writeText(`http://localhost:5173/${name}/${res.data.userAffiliateID}/${index}`);
        setCopyLink(`http://localhost:5173/${name}/${res.data.userAffiliateID}/${index}`)
        // console.log(res.data);
    })
    }


    const showAffiliateFunct = async(index) => {
        console.log(index)
        navigate('/main/affiliate-links/affiliate-program' , {state:{index: index}})
        // setShowSingleAffiliate(!ShowSingleAffiliate)
        setShowIndex(index)
        setPodLinks('pod-links')
        await axios.post('http://localhost:3000/oneData',{
            id,index
    }).then(res=> {
        setAffiliateName(res.data.affiliateName)
        setProductLink(res.data.productLink)
        setAffiliateDescription(res.data.affiliateDescription)
        setPrice(res.data.price)
        setCommissionRate(res.data.commissionRate)
        setStartDate(res.data.startDate)
        setEndDate(res.data.endDate)
        console.log(res.data)
        navigateLink( res.data.affiliateName, index)
    }) 
    }   
  

    return(
        <div className="main">
            {showPopup ? 
                <div className='popup-content'>
                    <div className='affiliate-card'>
                    <p onClick={() => {setShowPopup(false); window.location.reload();}} className='close-card'>x</p>
                        <h1>Create Affiliate Program</h1>
                        <form onSubmit={CreateAffiliate}>
                            <div className='name-link-flex'>
                                <input className='affiliate-name' type='text' placeholder='Affiliate Name' onChange={(e) => setAffiliateName(e.target.value)} />
                                <input className='product-link' type='text' placeholder='Product Link' onChange={(e) => setProductLink(e.target.value)}/>
                            </div>
                            <textarea name="" id="" cols="30" rows="10" placeholder='Affiliate Description' onChange={(e) => setAffiliateDescription(e.target.value)}></textarea>
                            <div className='end-grid'>
                                <input type='text' placeholder='Price' onChange={(e) => setPrice(e.target.value)} />
                                <input type='text' placeholder='Commission Rate' onChange={(e) => setCommissionRate(e.target.value)} />
                                <input type='text' placeholder='Start Date' onChange={(e) => setStartDate(e.target.value)} />
                                <input type='text' placeholder='End Date'onChange={(e) => setEndDate(e.target.value)} />
                                <label>
        Auto Approve Affiliates:
        <input type='checkbox' onChange={(e) => {if(e.target.value == 'on'){setAutoApprove(true)}else{setAutoApprove(false)}}} />
    </label>
                            </div>
                            <div className='affiliate-design'>
                                <p>Affiliate Registration Page design</p>
                            <div className='design-flex'>
                                <div className="design-color-part">
                                <div className='design-one'>
                                    <label htmlFor="background-color">Background Color</label>
                                    <input type="color" name='background-color' defaultValue="#ffffff" onChange={(e) => setBackgroundColor(e.target.value)} />
                            </div>
                            <div className='design-one'>
                                <label htmlFor="text-color">Text Color</label>
                                 <input type="color" name='text-color' defaultValue="#3b3b3b" onChange={(e) => setTextColor(e.target.value)}/>
                            </div>
                            <div className='design-one'>
                                <label htmlFor="button-color">Button Color</label>
                                <input type="color" name='button-color' defaultValue="#3b3b3b" onChange={(e) => setButtonColor(e.target.value)} />
                            </div>
                            <div className='design-one'>
                                <label htmlFor="button-text-color">Button Text Color</label>
                                <input type="color" name='button-text-color' defaultValue="#ffffff" onChange={(e) => setButtonTextColor(e.target.value)} />
                            </div>
                                </div>
                                 <div className="design-text-part">
                                     <div className='design-one'>
                                        <label htmlFor="headline-text">Headline Text</label>
                                        <input type="text" name='headline-text' defaultValue="Default handle"  onChange={(e) => setHeadlineText(e.target.value)}/>
                                     </div>
                                     <div className='design-one'>
                                        <label htmlFor="email-sent-text">Email Sent Text</label>
                                        <input type="text" name='email-sent-text' defaultValue="Default email sent text" onChange={(e) => setEmailSentText(e.target.value)} />
                                     </div>
                                 </div>
                            </div>
                            </div>
                            <button className='affiliate-btn' type='submit'>Create</button>
                        </form>
                    </div>
                </div> : null}

                {showEditPopup ?
                 <div className='popup-content'>
                 <div className='affiliate-card'>

                     <h1>Create Affiliate Program</h1>
                     <form onSubmit={saveData}>
        <div className='name-link-flex'>
            <input className='affiliate-name' type='text' placeholder='Affiliate Name' onChange={(e) => handleChange(e, 'affiliateName')} value={data[editIndex].affiliateName} />
            <input className='product-link' type='text' placeholder='Product Link' onChange={(e) => handleChange(e, 'productLink')} value={data[editIndex].productLink}/>
        </div>
        <textarea name="" id="" cols="30" rows="10" placeholder='Affiliate Description' onChange={(e) => handleChange(e, 'affiliateDescription')} >{data[editIndex].affiliateDescription}</textarea>
        <div className='end-grid'>
            <input type='text' placeholder='Price' onChange={(e) => handleChange(e, 'price')} value={data[editIndex].price}  />
            <input type='text' placeholder='Commission Rate' onChange={(e) => handleChange(e, 'commissionRate')} value={data[editIndex].commissionRate}/>
            <input type='text' placeholder='Start Date' onChange={(e) => handleChange(e, 'startDate')} value={data[editIndex].startDate}/>
            <input type='text' placeholder='End Date'onChange={(e) => handleChange(e, 'endDate')} value={data[editIndex].endDate} />
        </div>
        <div className='affiliate-design'>
                                <p>Affiliate Registration Page design</p>
                            <div className='design-flex'>
                                <div className="design-color-part">
                                <div className='design-one'>
                                    <label htmlFor="background-color">Background Color</label>
                                    <input type="color" name='background-color' value={data[editIndex].BackgroundColor} onChange={(e) => handleChange(e, 'BackgroundColor')}/>
                            </div>
                            <div className='design-one'>
                                <label htmlFor="text-color">Text Color</label>
                                 <input type="color" name='text-color' value={data[editIndex].TextColor} onChange={(e) => handleChange(e, 'TextColor')}/>
                            </div>
                            <div className='design-one'>
                                <label htmlFor="button-color">Button Color</label>
                                <input type="color" name='button-color' value={data[editIndex].ButtonColor} onChange={(e) => handleChange(e, 'ButtonColor')} />
                            </div>
                            <div className='design-one'>
                                <label htmlFor="button-text-color">Button Text Color</label>
                                <input type="color" name='button-text-color' value={data[editIndex].ButtonTextColor} onChange={(e) => handleChange(e, 'ButtonTextColor')} />
                            </div>
                                </div>
                                 <div className="design-text-part">
                                     <div className='design-one'>
                                        <label htmlFor="headline-text">Headline Text</label>
                                        <input type="text" name='headline-text' value={data[editIndex].HeadlineText}  onChange={(e) => handleChange(e, 'HeadlineText')}/>
                                     </div>
                                     <div className='design-one'>
                                        <label htmlFor="email-sent-text">Email Sent Text</label>
                                        <input type="text" name='email-sent-text' value={data[editIndex].EmailSentText} onChange={(e) => handleChange(e, 'EmailSentText')} />
                                     </div>
                                 </div>
                            </div>
                            </div>
        <button className='affiliate-btn' type='submit'>Save</button>
    </form>
                 </div>
             </div> : null }
             
        <div className='loged-nav'>
            <h1 className='loged-logo'>Logo</h1>
            <ul className='nav-ul'>
                <div>
                    <li ><Link to="/main" state={{from: "affiliate"}} className={oneNavClass}  href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>home</title><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg> <span>Home</span></Link></li>
                    <li>
    <Link 
        to="/main/dashboard" 
        state={{ from: "affiliate" }}
        onClick={() => console.log('click')} 
        className={twoNavClass}
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>view-dashboard</title>
            <path d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
        </svg>
        Dashboard
    </Link>
</li>
                    <li ><Link to="/main/affiliate-links" className={threeNavClass}  href="#"><svg className='affiliate-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>link-box-variant</title><path d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.94,14.81L11.73,17C11.08,17.67 10.22,18 9.36,18C8.5,18 7.64,17.67 7,17C5.67,15.71 5.67,13.58 7,12.26L8.35,10.9L8.34,11.5C8.33,12 8.41,12.5 8.57,12.94L8.62,13.09L8.22,13.5C7.91,13.8 7.74,14.21 7.74,14.64C7.74,15.07 7.91,15.47 8.22,15.78C8.83,16.4 9.89,16.4 10.5,15.78L12.7,13.59C13,13.28 13.18,12.87 13.18,12.44C13.18,12 13,11.61 12.7,11.3C12.53,11.14 12.44,10.92 12.44,10.68C12.44,10.45 12.53,10.23 12.7,10.06C13.03,9.73 13.61,9.74 13.94,10.06C14.57,10.7 14.92,11.54 14.92,12.44C14.92,13.34 14.57,14.18 13.94,14.81M17,11.74L15.66,13.1V12.5C15.67,12 15.59,11.5 15.43,11.06L15.38,10.92L15.78,10.5C16.09,10.2 16.26,9.79 16.26,9.36C16.26,8.93 16.09,8.53 15.78,8.22C15.17,7.6 14.1,7.61 13.5,8.22L11.3,10.42C11,10.72 10.82,11.13 10.82,11.56C10.82,12 11,12.39 11.3,12.7C11.47,12.86 11.56,13.08 11.56,13.32C11.56,13.56 11.47,13.78 11.3,13.94C11.13,14.11 10.91,14.19 10.68,14.19C10.46,14.19 10.23,14.11 10.06,13.94C8.75,12.63 8.75,10.5 10.06,9.19L12.27,7C13.58,5.67 15.71,5.68 17,7C17.65,7.62 18,8.46 18,9.36C18,10.26 17.65,11.1 17,11.74Z" /></svg><svg className='arrow-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>Affiliate Links</Link></li>
                <ul className={podLinks}>
                <li><Link  className='affiliate-link' onClick={(e) =>{if(ShowSingleAffiliate != true){e.preventDefault()}}} to="/main/affiliate-links/affiliate-program"  href="#">Affiliate Program</Link></li>
                    <li><Link to="/main/affiliate-links/affiliates" onClick={(e) =>{if(ShowSingleAffiliate != true){e.preventDefault()}}} state={{from: "affiliate"}}  href="#">Affiliates</Link></li>
                    <li><Link to="/main/affiliate-links/emails" onClick={(e) =>{if(ShowSingleAffiliate != true){e.preventDefault()}}} href="#">Emails</Link></li>
                    <li><Link to="/main/affiliate-links/transactions" onClick={(e) =>{if(ShowSingleAffiliate != true){e.preventDefault()}}} href="#">Transactions</Link></li>
                    <li><Link to="/main/affiliate-links/balance" onClick={(e) =>{if(ShowSingleAffiliate != true){e.preventDefault()}}} href="#">Balance</Link></li>
                </ul>
                </div>
                <li ><Link to="/main/settings" state={{from: "affiliate"}} className={`${fourNavClass} setings-click`} href="#">Settings</Link></li>
            </ul>
        </div>
        <div className='main-part'>
            

{ShowSingleAffiliate ? <div>
<p>{affiliateName}</p>
<p>{productLink}</p>
<p>{affiliateDescription}</p>
<p>{price}</p>
<p>{commissionRate}</p>
<p>{startDate}</p>
<p>{endDate}</p>
<p>{copyLink}</p>
</div> : <div className="main-affiliate">

        {data.map((item, index) => (
          <div key={index} data-index={index} className='link-data-card' onClick={(e) => showAffiliateFunct(index)} >
            <h1 className='affiliate-name'>{item.affiliateName}</h1>
            <div>
                <p>Price: {item.price}</p>
                <p>Commision: {item.commissionRate}</p>
            </div>
            {/* <a
        key={index} 
            // onClick={() => navigate(`/${item.affiliateName}/adrian/${index}`, { state: {data: item, id: id, index: index}})}
            
    >
        Link {index + 1}
        </a> */}
            {/* <div className='svg-flex'>
                <svg onClick={() => editPopup(index)} className='edit-btn' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>
                <svg onClick={(e) =>navigateLink(e, item.affiliateName, index)}  className='edit-btn' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>content-copy</title><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" /></svg>
            </div> */}
          </div>
        ))}




                <div className='add-link' onClick={linkPopup}>
                    <p>Create Affiliate Program</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus-circle</title><path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
                </div>
            </div>}

        </div>
        </div>
    )
}
