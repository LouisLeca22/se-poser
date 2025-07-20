import Image from 'next/image';

type UserInfoProps = {
    profile: {
        profileImage: string;
        firstName: string;
    };
};



function UserInfo({ profile: { profileImage, firstName } }: UserInfoProps) {
    return (
        <article className='flex items-center gap-4 mt-4'>
            <Image
                src={profileImage}
                alt={firstName}
                width={50}
                height={50}
                className='rounded-md w-12 h-12 object-cover'
            />
            <div>
                <p>
                    Hosted by
                    <span className='font-bold'> {firstName}</span>
                </p>

            </div>
        </article>
    );
}
export default UserInfo