import AvatarCreation from '../AvatarCreation';

export default function AvatarCreationExample() {
  return (
    <AvatarCreation onComplete={(customization) => console.log('Avatar created:', customization)} />
  );
}
