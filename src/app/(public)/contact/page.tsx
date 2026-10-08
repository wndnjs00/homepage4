import type { Metadata } from 'next';

import { PageHero } from '@/frontend/components/layout/PageHero';
import { DetailBody, DetailLayout, DetailSide } from '@/frontend/components/ui/Detail';
import { Section } from '@/frontend/components/ui/Section';
import { InquiryForm } from '@/frontend/features/inquiry/components/InquiryForm';
import { COMPANY_INFO } from '@/shared/constants/navigation';

export const metadata: Metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <>
      <PageHero
        image="/images/phero-contact.jpg"
        crumbs={[{ label: 'Contact' }]}
        title="Contact"
        lead="시스템 구축·운영 유지보수·인프라·솔루션 문의를 남겨주시면 담당자가 검토 후 연락드립니다."
      />
      <Section tone="white">
        <DetailLayout
          body={
            <DetailBody>
              <h2>문의하기</h2>
              <p>
                아래 정보를 입력해 주세요. 실제 서비스 적용 시 담당자 메일({COMPANY_INFO.email})로 전송되도록 연동하는
                영역입니다.
              </p>
              <InquiryForm />
            </DetailBody>
          }
          side={
            <DetailSide
              rows={[
                { label: 'Telephone', value: <a href={COMPANY_INFO.telHref}>{COMPANY_INFO.tel}</a> },
                { label: 'Fax', value: COMPANY_INFO.fax },
                { label: 'E-mail', value: <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a> },
                {
                  label: 'Address',
                  value: (
                    <>
                      {COMPANY_INFO.address}
                      <small>{COMPANY_INFO.addressEn}</small>
                    </>
                  ),
                },
              ]}
            />
          }
        />
      </Section>
    </>
  );
}
