import { getProviders } from 'next-auth/react';
import Image from 'next/image';
import SignInComponent from './SignInComponent';

async function SignInPage() {
    const providers = await getProviders();
  return (
    <div className='grid justify-center'>
        <div>
            <Image src='https://links.papareact.com/161' alt='Facebook logo' width={700} height={700} className='rounded-full object-cover mx-2'/>
        </div>

        <SignInComponent providers={providers}/>
    </div>
  );
};

export default SignInPage;