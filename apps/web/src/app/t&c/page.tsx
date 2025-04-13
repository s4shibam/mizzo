import { APP_SLUG_CAP } from '@mizzo/utils'

import { Branding } from '@/components/common/branding'
import { termsAndConditionsData } from '@/constants/t&c'

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto w-[90%] max-w-4xl">
        <div className="flex flex-col items-center justify-center">
          <Branding />

          <h1 className="my-4 text-3xl font-semibold">Terms and Conditions</h1>
        </div>

        <p className="my-4 text-base">
          Please read these terms and conditions carefully before using{' '}
          {APP_SLUG_CAP}.
        </p>

        {termsAndConditionsData.map((section, index) => (
          <div key={index} className="mb-8 flex flex-col">
            <h2 className="text-primary text-xl font-semibold">
              {section?.heading}
            </h2>

            <div className="flex flex-col gap-3">
              {section.points.map((point, i) => (
                <p key={i} className="text-base">
                  {point}
                </p>
              ))}
            </div>
          </div>
        ))}

        <p className="my-4 text-base">
          By using {APP_SLUG_CAP}, you agree to these terms and conditions. If
          you do not agree with any part of these terms and conditions, please
          do not use our platform. Thanks.
        </p>
      </div>
    </div>
  )
}

export default TermsAndConditionsPage
