import { createFileRoute } from '@tanstack/react-router';

import GuestLayout from '@/shared/ui/layout/GuestLayout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/privacy')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <GuestLayout>
      <SubPageHeader title='개인정보 처리방침' />
      <article className='prose prose-neutral'>
        <header>
          <div className='text-5xl mb-4'>🔒</div>
          <h1 className='text-3xl font-bold mb-2'>블링킷 개인정보처리방침</h1>
          <p className='text-gray-500 mb-6'>2025. 04. 11. ver</p>
        </header>

        <p>
          토이파이브는 서비스의 제공에 있어 정보통신망 이용촉진 및 정보보호 등에
          관한 법률, 개인정보보호법 등 관련 개인정보보호 규정을 철저히 준수하며,
          관련법령에 따라 본 개인정보 처리방침을 정하여 이용자의 권익 보호에
          최선을 다하고 있습니다.
        </p>

        <h2 className=''>1. 개인정보 수집 및 이용 현황</h2>
        <p>
          회원가입 시점에 토이파이브가 이용자로부터 수집하는 개인정보는 아래와
          같습니다.
        </p>
        <table className='w-full table-auto border border-gray-200'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border px-3 py-2 text-left'>가입경로</th>
              <th className='border px-3 py-2 text-left'>필수 항목</th>
              <th className='border px-3 py-2 text-left'>보유 및 이용기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border px-3 py-2'>
                네이버 계정을 연동한 회원가입
              </td>
              <td className='border px-3 py-2'>
                이용자 고유 식별자, 이메일 주소, 닉네임
              </td>
              <td className='border px-3 py-2'>
                회원탈퇴시 까지※ 단, 관계 법령 위반에 따른 수사, 조사 등이
                진행중인 경우에는 해당 수사, 조사 종료 시 까지 보관 하며
                내부규정 혹은 관련법령에 따라 일정기간 보관됨.
              </td>
            </tr>
            <tr>
              <td className='border px-3 py-2'>
                Google 계정을 연동한 회원가입
              </td>
              <td className='border px-3 py-2'>
                이용자 고유 식별자, 이메일 주소, 닉네임
              </td>
              <td className='border px-3 py-2'>
                회원탈퇴시 까지※ 단, 관계 법령 위반에 따른 수사, 조사 등이
                진행중인 경우에는 해당 수사, 조사 종료 시 까지 보관 하며
                내부규정 혹은 관련법령에 따라 일정기간 보관됨.
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          또한, 이용자의 서비스 이용과정에서 서비스 이용 기록(접속일시,
          이용과정에서 발생하는 정상 또는 비정상 로그 등), IP 주소, 기기정보,
          광고식별자 등의 정보가 생성되어 수집될 수 있습니다.
        </p>
        <p>토이파이브는 아래의 방법을 통해 이용자의 개인정보를 수집합니다.</p>
        <ul>
          <li>
            회원가입 및 서비스 이용시 이용자가 직접 정보를 입력하는 경우, 해당
            개인정보를 수집합니다.
          </li>
          <li>
            이용자의 문의 및 응대시 웹페이지, 메일, 전화 등을 통해 이용자의
            개인정보가 수집될 수 있습니다.
          </li>
          <li>
            서비스 이용 정보 및 생성정보 등은 서비스 이용 과정에서 자동으로
            생성되어 수집될 수 있습니다.
          </li>
        </ul>

        <h2>2. 개인정보 수집 및 이용목적</h2>
        <ul>
          <li>
            회원제 서비스 이용에 따른 회원가입 의사의 확인, 회원탈퇴 의사의 확인
            등 회원관리
          </li>
          <li>
            관련법령, 이용약관 등 위반행위에 대한 제재, 부정 이용 행위를
            포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및
            제재, 약관 개정 등의 고지사항 전달, 질의 및 민원처리 등 이용자 보호
            및 서비스 운영
          </li>
          <li>
            서비스의 원활한 제공 및 개선, 신규 서비스 개발, 서비스 이용기록과
            접속빈도 등의 분석 및 관심사, 기호 등에 기반한 맞춤형 서비스 제공
          </li>
          <li>이용자가 안심하고 이용할 수 있는 안전한 서비스 이용환경 구축</li>
        </ul>

        <h2>3. 개인정보의 제3자 제공</h2>
        <p>
          토이파이브는 원칙적으로 이용자 동의 없이 개인정보를 제3자에게 제공하지
          않습니다. 다만, 아래의 경우에는 예외로 합니다.
        </p>
        <ul>
          <li>개인정보보호법 등 관계 법령이 정하는 경우</li>
          <li>수사 기관의 요청이 있는 경우</li>
          <li>
            이용자의 생명이나 안전에 급박한 위험이 확인되어 이를 해소하기 위한
            경우
          </li>
          <li>
            통계작성, 학술연구, 시장조사를 위하여 특정개인을 식별할 수 없는
            형태로 가공하여 제공하는 경우
          </li>
          <li>
            보유 및 이용기간: 서비스 제공 기간 (단, 관계법령에 정해진 규정에
            따른 해당 보유기간 동안 보관하며, 목적 달성시 즉시 파기)
          </li>
        </ul>

        <h2>4. 개인정보의 파기</h2>
        <p>
          토이파이브는 원칙적으로 이용자의 회원 탈퇴(이용계약 해지)시 해당
          이용자의 개인정보를 재생이 불가능한 방법으로 지체없이 파기합니다. 단,
          이용자로부터 별도 동의를 얻은 경우나 관련법령에서 일정기간 보관의무를
          부과하는 경우에는 해당 기간동안 이를 보관합니다.
        </p>
        <p>
          이용자로부터 개인정보의 보관기관에 대해 회원가입시 동의를 얻는 경우는
          다음과 같습니다.
        </p>
        <ul>
          <li>
            회원의 이용자 고유 식별자 : 탈퇴일로부터 30일간 보관 (민원 등 처리
            목적)
          </li>
        </ul>

        <h2>5. 이용자 및 법정대리인의 권리 및 그 행사방법</h2>
        <p>
          이용자는 언제든지 자신의 개인정보를 조회하거나 수정 또는 삭제할 수
          있고, 토이파이브에게 자신의 개인정보에 대한 열람, 정정, 처리정지,
          삭제를 요청할 수 있으며, 회원탈퇴 등을 통해 개인정보의 수집 및
          이용동의를 철회할 수 있습니다.
        </p>
        <ul>
          <li>개인정보 변경: 계정 설정</li>
          <li>동의 철회 : 계정 설정 &gt; 회원 탈퇴</li>
        </ul>
        <p>
          이용자가 개인정보의 오류에 대한 정정 또는 삭제를 요청한 경우,
          토이파이브는 이를 완료하기 전까지 해당 개인정보를 이용 또는 제공하지
          않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정
          처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 합니다.
        </p>

        <h2>6. 개인정보 자동수집 장치의 설치, 운영</h2>
        <p>
          서비스 이용과정이나 사업 처리 과정에서 아래와 같은 정보들이 자동으로
          생성되어 수집될 수 있습니다.
        </p>
        <ul>
          <li>
            IP Address, 방문 일시, 서비스 이용 기록: 부정 이용 방지, 비인가 사용
            방지 등
          </li>
        </ul>

        <h2>7. 개인정보 수집 동의 거부</h2>
        <p>
          회원은 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며,
          동의를 거부할 경우 받는 별도의 불이익은 없습니다.
        </p>
        <p>
          단, 필수 동의 사항에 동의를 거부할 경우, 서비스 이용이 불가능하거나
          서비스 이용 목적에 따른 서비스 제공에 제한이 따르게 됩니다.
        </p>

        <h2>8. 개인정보의 안전성 확보조치</h2>
        <ul>
          <li>
            이용자의 비밀번호와 같은 중요정보는 암호화하여 저장 및 관리되고
            있으며, 개인정보의 확인 및 변경은 비밀번호를 알고 있는 본인에
            의해서만 가능합니다.
          </li>
          <li>
            암호화 통신을 통하여 네트워크상에서 개인정보를 안전하게 송수신하고
            있습니다.
          </li>
          <li>개인정보를 처리하는 인원을 최소한으로 제한하고 있습니다.</li>
        </ul>
        <p>
          단, 토이파이브가 개인정보보호 의무를 다하였음에도 불구하고 이용자
          본인의 부주의나 토이파이브가 관리하지 않는 영역에서의 사고 등
          토이파이브의 귀책에 기인하지 않은 손해에 대해서는 토이파이브가 책임을
          지지 않습니다.
        </p>

        <h2>9. 개인정보 보호책임자 안내</h2>
        <p>
          토이파이브는 개인정보에 대한 의견수렴 및 불만처리, 열람청구에의 대응
          등을 위하여 다음과 같이 개인정보보호책임자를 지정하고 있습니다.
        </p>
        <ul>
          <li>이름: 차경묵</li>
          <li>이메일: blinkit.cs@gmail.com</li>
        </ul>

        <h2>10. 권익 침해에 대한 구제방법</h2>
        <p>
          기타 개인정보 침해에 대한 신고나 상담이 필요한 경우에 아래 기관에 문의
          가능합니다.
        </p>
        <table className='w-full table-auto border border-gray-200'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border px-3 py-2 text-left'>문의처</th>
              <th className='border px-3 py-2 text-left'>연락처</th>
              <th className='border px-3 py-2 text-left'>홈페이지</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border px-3 py-2'>개인정보침해 신고센터</td>
              <td className='border px-3 py-2'>(국번없이) 118</td>
              <td className='border px-3 py-2'>https://privacy.kisa.or.kr/</td>
            </tr>
            <tr>
              <td className='border px-3 py-2'>개인정보 분쟁조정위원회</td>
              <td className='border px-3 py-2'>(국번없이) 1833-6972</td>
              <td className='border px-3 py-2'>https://www.kopico.go.kr/</td>
            </tr>
            <tr>
              <td className='border px-3 py-2'>대검찰청 사이버범죄수사단</td>
              <td className='border px-3 py-2'>(국번없이) 1301</td>
              <td className='border px-3 py-2'>https://www.spo.go.kr/</td>
            </tr>
            <tr>
              <td className='border px-3 py-2'>경찰청 사이버안전지킴이</td>
              <td className='border px-3 py-2'>(국번없이) 182</td>
              <td className='border px-3 py-2'>https://www.police.go.kr/</td>
            </tr>
          </tbody>
        </table>

        {/* 11장 */}
        <h2>11. 고지의 의무</h2>
        <p>
          이 개인정보 처리방침은 시행일로부터 적용됩니다. 개인정보 처리방침의
          내용은 관련법령, 정부의 정책 또는 보안기술의 변경 등에 따라 변경될 수
          있고, 그 경우 변경된 개인정보 처리방침의 시행일로부터 최소 7일 전에
          공지사항을 통해 고지합니다.
        </p>
        <p>이 개인정보 처리방침은 2025년 04월 11일부터 적용됩니다.</p>
      </article>
    </GuestLayout>
  );
}
