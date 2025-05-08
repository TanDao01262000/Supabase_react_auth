import { useState } from 'react';
import supabase from '../helper/supabaseClient';

function ProfileUpdate() {
  const [nativeLanguage, setNativeLanguage] = useState('');
  const [targetLanguages, setTargetLanguages] = useState('');
  const [country, setCountry] = useState('');
  const [interests, setInterests] = useState('');
  const [proficiencyLevel, setProficiencyLevel] = useState('');
  const [message, setMessage] = useState('');


  // Handle profile update
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      // Get the current user's ID
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage('User not authenticated.');
        return;
      }

      const userId = user.id; // Use the user's ID from auth.users
      console.log('User ID:', userId); // Debugging

      // Update the user's profile in the profiles table
      const { data, error } = await supabase
        .from('profiles')
        .update({
          native_language: nativeLanguage,
          target_language: targetLanguages.split(',').map((lang) => lang.trim()),
          country: country,
          interests: interests.split(',').map((interest) => interest.trim()),
          proficiency_level: proficiencyLevel,
        })
        .eq('id', userId) // Match the row where id equals the user's ID
        .select();

      if (error) {
        console.error('Supabase Error:', error); // Log the error
        setMessage('Failed to update profile. Please try again.');
      } else if (data.length === 0) {
        console.warn('No rows updated. Check if the user ID exists in the profiles table.');
        setMessage('No profile found to update.');
      } else {
        console.log('Updated Profile:', data); // Log the updated data
        setMessage('Profile updated successfully!');
      }
    } catch (err) {
      setMessage('Failed to update profile. Please try again.');
      console.error('Update Profile Error:', err);
    }
  };

  return (
    <div>
      <h2>Update Your Profile</h2>
      <p>Complete your profile information below:</p>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Native Language:</label>
          <input
            type="text"
            value={nativeLanguage}
            onChange={(e) => setNativeLanguage(e.target.value)}
            placeholder="e.g., English"
            required
          />
        </div>
        <div>
          <label>Target Languages (comma-separated):</label>
          <input
            type="text"
            value={targetLanguages}
            onChange={(e) => setTargetLanguages(e.target.value)}
            placeholder="e.g., Spanish, French"
            required
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g., USA"
            required
          />
        </div>
        <div>
          <label>Interests (comma-separated):</label>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g., coding, reading"
            required
          />
        </div>
        <div>
          <label>Proficiency Level:</label>
          <select
            value={proficiencyLevel}
            onChange={(e) => setProficiencyLevel(e.target.value)}
            required
          >
            <option value="">Select Proficiency Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="fluent">Fluent</option>
          </select>
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default ProfileUpdate;