// defining the message constant
// tslint:disable-next-line: no-namespace
export namespace CommonConstants {
  export const ERROR_MSG_409 = 'Currently data sync in progress. Please try after some time.';
  export const ERROR_MSG_401 = 'Your session has expired. Please login back in again';
  export const ERROR_MSG_500 = 'Opps something went wrong! Our engineer is aware of it. Please check back shortly.';
  export const INTERNAL_SERVER_ERROR = 'Internal Server Error!';
  export const CONTACT_ADD_MSG = 'We\'ve created your contact! You will now be directed to their record.';
  export const COMMON_ERR_MSG = 'Some thing went wrong. Please try again later';
  export const COMMON_ERR_MSG_1 = 'Permission Denied';
  export const REMOVE_APP = 'We\'ve cleared your application.';
  export const API_TIME_DURATION = 10000; // in millisecond
  export const RegexPostalCode = '^[1-9][0-9]{4}[0-9]*$';
  export const regexMobileNumber = '^[0-9]{3}-?[0-9]{3}-?[0-9]{4}$';
  export const EmailRegex: any = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
  export const AllowOnlyNumberRegex: any = '^[0-9]+$';
  export const branchesDataarr = ['Ameerpet', 'Banjara Hills', 'Dilsukh nagar', 'Secunderabad', 'Test linux', 'Surat', 'Vijayawada'];
  export const coursesDataarr = [
    'CCNA',
    'MCSE - Windows Server 2012',
    'LINUX Administration',
    'EXCHANGE SERVER 2013',
    'CCNP',
    'VMware (old)',
    'CISCO ASA Firewall + CISCO IPS',
    'CCNA (Security)',
    'Private Cloud',
    'LINUX - Advanced',
    'VMware Cloud',
    'CCIE (Routing & Switching)',
    'Batch Shifting Charges',
    'MCSE-2012 (Old)',
    'Workshop on emerging Technologies',
    'Certificate-old',
    'EHCE US-Council',
    'VMware vSphere 6.0',
    'CHECKPOINT FIREWALL',
    'CCIE (R&S)',
    'CCIE (R&S) BOOT CAMP',
    'MCSE 2012 One to One Training',
    'Certificate-1No.',
    'Certificate - 2 No.s',
    'Certificate - 3No.s',
    'Certificate - 4 No.s',
    'Certificate - 5 No.s',
    'Microsoft Private Cloud',
    'Amazon Web Services',
    'MCP 1 Voucher',
    'MCP 2 Voucher',
    'MCP 3 Voucher',
    'MCP 4 Voucher',
    'MCP 5 Voucher',
    'CCNA Weekend Batch',
    'CCNA One to One',
    'Microsoft MCP Voucher 1',
    'Microsoft MCP Voucher 2',
    'Microsoft MCP Voucher 3',
    'Microsoft MCP Voucher 4',
    'Microsoft MCP Voucher 5',
    'CCNP Weekend',
    'Microsoft AZURE',
    'LINUX Weekend',
    'AWS Weekend',
    'DevOps',
    'MCSA - Windows Server 2016',
    'Linux one to one',
    'EHCE - Ethical Hacking & Countermeasures Expert',
    'AWS One to One',
    'VMWARE',
    'Online Classroom Training - CCNA-V3.0',
    'Online Classroom Training - MCSE Server 2012',
    'Online Classroom Training - LINUX',
    'Online Classroom Training - LINUX-Advanced',
    'Online Classroom Training - Amazon Web Services',
    'Online Classroom Training - Microsoft AZURE',
    'ccna security weekend',
    'CCNP - Routing & Switching',
    'checkpoint Firewall (Bootcamp)',
    'Microsoft Office 365',
    'Hardware and Networking',
    'Online Classroom Training - CCNA Security',
    'Online Classroom Training - ASA Firewalls',
    'Ethical Hacking and Prevention',
    'Cybersecurity Professional',
    'Computer Hardware',
    'MCSE - 2012 (NP)',
    'MCSE - 2012 (CA)',
    'MCSE - 2012 (CP)',
    'MCSE (Server Infrastructure)',
    'MCSE (CA)',
    'MCSE (CP)',
    'LINUX',
    'CCNA - V3.0',
    'Cisco Security',
    'Ethical Hacking & Prevention',
    'CCNA R&S and Cisco Security',
    'MCSE and LINUX Administration',
    'CCNP+CCIE (Routing and Switching)',
    'VMware vSphere + vCloud',
    'Linux Professional',
    'MCSE One to One July 2019',
    'CCNA R&S One to One July 2019',
    'Office 365 New',
    'MCSE-VJW',
    'CCNA-VJW',
    'Linux-VJW',
    'Ethical Hacking & Prevention -VJW',
    'Cybersecurity Professional -VJW'
  ];
  export const assignFunctionDataarr = [
    'Add Branch',
    'Add Course',
    'Add Course Fee',
    'Add Course Package',
    'Add Course Schedule',
    'Add Employee',
    'Add Role',
    'Add Student',
    'Edit Branch',
    'Edit Course',
    'Edit Course Fee',
    'Edit Course Package',
    'Edit Course Schedule',
    'Edit Employee',
    'Edit Role',
    'Edit Student',
    'Search Student',
    'Student Image Upload'
  ];
  export const reportsDataarr = [
    'Accountant Report',
    'Attandance Sheet',
    'Cancel Receipt',
    'Course Specific Report',
    'Cousellor Report',
    'Deleted Student',
    'Details of students registered Report',
    'Generate ID Card',
    'Payment Report',
    'Payment Status',
    'Print Certificate',
    'Print Fee Receipt',
    'Receipt Status',
    'Student Enrolled Report',
    'Student Not Enrolled Report',
    'Total Admission Report'
    ];

  export const coursePackagearr = [
    'H/W and Networking Package Course',
    'CISCO (R&S) TRACK',
    'CCNA AND CCNP (R&S)',
    'Test CSRF',
    'TEST CSRF1',
    'CCNP + CCIE',
    'LINUX Administration',
    'VMWARE PACKAGE',
    'JOB Guarantee program',
    'ASA Firewall + CISCO IPS (CCNA & CCNP - Security)',
    'CCNA & CCNP (Routing & Switching)',
    'Cybersecurity Professional',
    'LINUX, AWS-Amazon Web Services',
    'one year diploma course - Cybersecurity, computer Hardware & Networking',
    'Ethical Hacking and Cloud Package',
    'Ethical Hacking And Networking Package Course',
    'Hardware & Networking Package',
    'Cybersecurity Associate',
    'Cybersecurity Associate Package',
    'Cybersecurity Professional Package',
    'Cybersecurity Professional Module-1 - VJW',
    'Cybersecurity Professional - VJW',
    'All Package'
  ];
  export const coursePackageAndNames = [
    {
      packageName: 'H/W and Networking Package Course',
      courseNames : ['CCNA', ' MCSE - Windows Server 2012', 'LINUX Administration', ' Workshop on emerging Technologies', 'Hardware and Networking'],
      branches: ['Ameerpet', 'Banjara Hills', 'Dilsukh nagar', 'Secunderabad']
    },
    {
      packageName: 'CISCO (R&S) TRACK',
      courseNames : [	'CCNA', 'CCNP', 'CCIE (R&S)'],
      branches: ['Ameerpet']
    },
    {
      packageName: 'CCNA AND CCNP (R&S)',
      courseNames : ['CCNA', 'CCNP'],
      branches: ['Ameerpet']
    },
    {
      packageName: 'Test CSRF',
      courseNames : ['CCNA', 'MCSE - Windows Server 2012'],
      branches: ['Ameerpet', ' Banjara Hills', 'Dilsukh nagar', 'Secunderabad', 'Test linux']
    },
    {
      packageName: 'TEST CSRF1',
      courseNames : ['CCNA', ' EXCHANGE SERVER 2013'],
      branches: [	'Ameerpet', ' Banjara Hills', 'Dilsukh nagar', 'Secunderabad', 'Test linux']
    },
    {
      packageName: 'CCNP + CCIE',
      courseNames : ['CCNA', 'CCIE (R&S)'],
      branches: [	'Ameerpet']
    },
    {
      packageName: 'LINUX Administration',
      courseNames : ['LINUX Administration', ' LINUX - Advanced'],
      branches: [	'Ameerpet', ' Banjara Hills', 'Dilsukh nagar', 'Secunderabad']
    },
    {
      packageName: 'VMWARE PACKAGE',
      courseNames : [	'VMware Cloud', 'VMware vSphere 6.0'],
      branches: ['Ameerpet']
    },
    {
      packageName: 'JOB Guarantee program',
      courseNames : ['Hardware and Networking', 'Ethical Hacking and Prevention', 'MCSE (Server Infrastructure)', 'LINUX', 'CCNA - V3.0', 'Cisco Security'],
      branches: ['Ameerpet']
    },
    {
      packageName: ' ASA Firewall + CISCO IPS (CCNA & CCNP - Security)',
      courseNames : ['CISCO ASA Firewall + CISCO IPS', 'CCNA (Security)'],
      branches: ['Ameerpet']
    },
    {
      packageName: 'CCNA & CCNP (Routing & Switching)',
      courseNames : ['CCNA', 'CCNP - Routing & Switching'],
      branches: ['Ameerpet']
    },
    {
      packageName: ' Cybersecurity Professional',
      courseNames : ['CCNA', 'LINUX Administration', 'Hardware and Networking', 'Cybersecurity Professional', 'MCSE - 2012 (CP)'],
      branches: [	'Ameerpet', 'Vijayawada']
    },
    {
      packageName: 'LINUX, AWS-Amazon Web Services',
      courseNames : ['LINUX Administration', ' Amazon Web Services'],
      branches: [	'Ameerpet']
    },
    {
      packageName: 'one year diploma course - Cybersecurity, computer Hardware & Networking',
      courseNames : ['CCNA', 'MCSE - Windows Server 2012', 'LINUX Administration', ' Cybersecurity Professional', 'Computer Hardware'],
      branches: [	'Surat']
    },
    {
      packageName: 'Ethical Hacking and Cloud Package',
      courseNames : ['CCNA', 'MCSE - Windows Server 2012', 'LINUX Administration', 'Microsoft AZURE', 'Microsoft Office 365', 'Ethical Hacking and Prevention'],
      branches: ['Surat']
    },
    {
      packageName: ' Ethical Hacking And Networking Package Course',
      courseNames : ['CCNA', 'MCSE - Windows Server 2012', 'LINUX Administration', 'Hardware and Networking', 'Ethical Hacking and Prevention'],
      branches: ['Ameerpet']
    },
    {
      packageName: 'Hardware & Networking Package',
      courseNames : [	'CCNA', 'LINUX Administration', 'Hardware and Networking', 'MCSE - 2012 (NP)'],
      branches: [	'Ameerpet', 'Banjara Hills', 'Vijayawada']
    },
    {
      packageName: 'Cybersecurity Associate',
      courseNames : ['CCNA', 'LINUX Administration', 'Hardware and Networking', 'Ethical Hacking and Prevention', 'MCSE - 2012 (CA)'],
      branches: [	'Ameerpet', 'Banjara Hills', 'Vijayawada']
    },
    {
      packageName: ' Cybersecurity Associate Package',
      courseNames : ['MCSE (CA)', 'LINUX', 'CCNA - V3.0', 'Cisco Security', 'Ethical Hacking & Prevention'],
      branches: [	'Ameerpet', 'Banjara Hills', 'Surat', 'Vijayawada']
    },
    {
      packageName: ' Cybersecurity Professional Package',
      courseNames : ['Cybersecurity Professional', ' MCSE (CP)', 'LINUX', 'CCNA - V3.0', 'Cisco Security'],
      branches: [	'Ameerpet', 'Vijayawada']
    },
    {
      packageName: ' Cybersecurity Professional Module-1 - VJW',
      courseNames : ['MCSE-VJW', 'CCNA-VJW', 'Linux-VJW'],
      branches: [	'Vijayawada']
    },
    {
      packageName: 'Cybersecurity Professional - VJW',
      courseNames : ['MCSE-VJW', 'CCNA-VJW', 'Linux-VJW', 'Cybersecurity Professional -VJW'],
      branches: ['Vijayawada']
    }
  ];
  export function jsons() {
    return JSON.stringify;
  }

  export function jsonp() {
    return JSON.parse;
  }

  export function getTodayDate() {
    return new Date();
  }

  export function getItem(key: string) {
    return localStorage.getItem(key);
  }

  export function removeItem(key: string) {
    return localStorage.removeItem(key);
  }

  export function setItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  export function getToken() {
    return localStorage.getItem('token');
  }

  export function setToken(value: string) {
    return localStorage.setItem('token', value);
  }

  export function removeToken() {
    return localStorage.removeItem('token');
  }

  export function clearLocalStorage() {
    return localStorage.clear();
  }
}
