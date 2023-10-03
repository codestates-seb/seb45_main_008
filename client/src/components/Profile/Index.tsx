// ProfileComponent.tsx
import React from 'react';
import ProfileModal from "./profileModal";

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileComponent: React.FC<ProfileProps> = ({ isOpen, onClose }) => {
  return isOpen ? <ProfileModal onClose={onClose} /> : null;
};

export default ProfileComponent;
