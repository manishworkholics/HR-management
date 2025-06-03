//Profile.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header';

export default function Profile() {
  const userId = localStorage.getItem("user_id"); 

  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [profilePic, setProfilePic] = useState("https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg");
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let uploadedImageUrl = profilePic;

    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await axios.post(
          "http://206.189.130.102:5050/api/v1/uploading",
          formData
        );
        uploadedImageUrl = uploadRes.data?.url || uploadedImageUrl;
      }

      const updatedUser = {
        mail_id: email,
        address,
        mobile: phone,
        gender,
        image: uploadedImageUrl
      };

      await axios.put(`http://206.189.130.102:5050/api/users/${userId}`, updatedUser);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className='container-fluid'>
      <div className='mb-3'>
        <Header />
      </div>
      <div className='container card bg-ffffff94 border-0 rounded-5 h-100 mb-3 p-4'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3 mt-3 d-flex flex-column align-items-center'>
            <div className="position-relative" style={{ width: '120px', height: '120px' }}>
              <img
                src={profilePic}
                className='profileImg'
                alt='Profile'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '2px solid #ccc'
                }}
              />
              <label
                htmlFor="profileImageUpload"
                className="position-absolute bottom-0 end-0 bg-white rounded-circle p-1 border"
                style={{ cursor: 'pointer' }}
                title="Change profile picture"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png"
                  alt="Edit"
                  style={{ width: '24px', height: '24px' }}
                />
              </label>
              <input
                type="file"
                id="profileImageUpload"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>
            <div className='mt-5'>
              <h2 className='text-center'>Edit Profile</h2>
            </div>
          </div>

          <div className="mb-3 mt-3 d-flex flex-column align-items-center">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control form-control-sm w-50 border rounded-3"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3 d-flex flex-column align-items-center">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control form-control-sm w-50 border rounded-3"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-3 d-flex flex-column align-items-center">
            <label htmlFor="phone" className="form-label">Phone no.</label>
            <input
              type="text"
              className="form-control form-control-sm w-50 border rounded-3"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-3 d-flex flex-column align-items-center">
            <label htmlFor="genderSelect" className="form-label">Gender</label>
            <select
              className="form-select form-select-sm w-50 border rounded-3"
              id="genderSelect"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary px-4 mt-2">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}