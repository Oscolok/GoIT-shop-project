import { refs } from './refs';
import { isLogIn } from '../../auth-form/js/auth-form';
import { updateUserAvatar } from '../../services/user-api';

export function avatarManipulation() {
  const fileInput = document.querySelector('.user-avatar__file-input');
  const clearAvatarBtn = document.querySelector('.user-avatar__clear-btn');

  fileInput.addEventListener('change', hendleChange);
  clearAvatarBtn.addEventListener('click', resetForDefault);
}

function hendleChange(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    const imgSearche = document.querySelectorAll('.avatar');

    imgSearche.forEach(img => (img.src = reader.result));

    const localUserObj = JSON.parse(localStorage.getItem('user-info'));
    updateUserAvatar(localUserObj.userId, reader.result, localUserObj.token);
    // location.reload();
    // isLogIn();
  };

  file ? reader.readAsDataURL(file) : (refs.avatarImg.src = '');
}

function resetForDefault() {
  const srcDefault = 'https://i.ibb.co/K7j3rZk/99-512.png';

  document.querySelectorAll('.avatar').forEach(img => (img.src = srcDefault));

  const localUserObj = JSON.parse(localStorage.getItem('user-info'));
  updateUserAvatar(localUserObj.userId, srcDefault, localUserObj.token);

  //   isLogIn();
}
