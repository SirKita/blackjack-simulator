import Avatar from '../Avatar';

export default function AvatarExample() {
  return (
    <Avatar
      customization={{
        hairColor: 'brown',
        eyeColor: 'blue',
        noseSize: 'medium',
        mouthType: 'smile',
        facialHair: 'beard',
        gender: 'male',
      }}
      balance={125000}
      className="w-64"
    />
  );
}
