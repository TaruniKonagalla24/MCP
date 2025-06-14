import React, { useRef, useState } from 'react';
import './Settings.css';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
const Settings = () => {
 const fileInputRef = useRef(null);
 const [profileImage, setProfileImage] = useState(null);
 const [fullName, setFullName] = useState('');
 const [email, setEmail] = useState('');
 const [linkedin, setLinkedin] = useState('');
 const [github, setGithub] = useState('');
 const [bio, setBio] = useState('');
 const [role, setRole] = useState('');
 const [skillInput, setSkillInput] = useState('');
 const [skills, setSkills] = useState([]);
 const handleImageChange = (e) => {
   if (e.target.files[0]) {
     setProfileImage(URL.createObjectURL(e.target.files[0]));
   }
 };
 const handleDeleteImage = () => setProfileImage(null);
 const handleAddSkill = (e) => {
   e.preventDefault();
   if (skillInput.trim() && !skills.includes(skillInput.trim())) {
     setSkills([...skills, skillInput.trim()]);
     setSkillInput('');
   }
 };
 const handleRemoveSkill = (skill) => {
   setSkills(skills.filter((s) => s !== skill));
 };
 const handleSaveChanges = () => {
   const data = {
     fullName,
     email,
     linkedin,
     github,
     bio,
     role,
     skills,
   };
   console.log('Saved Data:', data);
   alert('Changes saved!');
 };
 return (
<div className="settings-container">
<h2>User Settings</h2>
<div className="settings-main">
<div className="settings-left">
<input
           type="text"
           placeholder="Full Name"
           value={fullName}
           onChange={(e) => setFullName(e.target.value)}
         />
<input
           type="email"
           placeholder="Email Address"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
         />
<input
           type="url"
           placeholder="LinkedIn Profile"
           value={linkedin}
           onChange={(e) => setLinkedin(e.target.value)}
         />
<input
           type="url"
           placeholder="GitHub Profile"
           value={github}
           onChange={(e) => setGithub(e.target.value)}
         />
<textarea
           placeholder="Bio"
           value={bio}
           onChange={(e) => setBio(e.target.value)}
           rows="3"
         />
<select
           value={role}
           onChange={(e) => setRole(e.target.value)}
           className="role-dropdown"
>
<option value="">Select Role</option>
<option>Frontend Developer</option>
<option>Backend Developer</option>
<option>Full Stack Developer</option>
<option>DevOps Engineer</option>
<option>Data Scientist</option>
<option>AI/ML Engineer</option>
</select>
<form onSubmit={handleAddSkill} className="skill-form">
<input
             type="text"
             placeholder="Add a skill and press Enter"
             value={skillInput}
             onChange={(e) => setSkillInput(e.target.value)}
           />
</form>
<div className="skill-tags">
           {skills.map((skill) => (
<span key={skill} className="skill-tag">
               {skill}
<button type="button" onClick={() => handleRemoveSkill(skill)}>
&times;
</button>
</span>
           ))}
</div>
<button onClick={handleSaveChanges} className="save-btn">
           Save Changes
</button>
</div>
<div className="settings-right">
         {profileImage ? (
<img src={profileImage} alt="Profile" className="profile-img" />
         ) : (
<div className="profile-placeholder">No Image</div>
         )}
<button
           onClick={() => fileInputRef.current.click()}
           className="upload-btn"
>
           Upload Image
</button>
<input
           type="file"
           ref={fileInputRef}
           style={{ display: 'none' }}
           onChange={handleImageChange}
         />
         {profileImage && (
<button onClick={handleDeleteImage} className="delete-btn">
             Delete
</button>
         )}
{/* <div className="social-links">
           {linkedin && (
<a href={linkedin} target="_blank" rel="noreferrer">
<FaLinkedin size={24} color="#0A66C2" />
</a>
           )}
           {github && (
<a href={github} target="_blank" rel="noreferrer">
<FaGithub size={24} color="#171515" />
</a>
           )}
</div> */}
</div>
</div>
</div>
 );
};
export default Settings;