import {seed,organizations} from './seed.js?v=review-20261016-3';
export function affiliations(company){
 if(Array.isArray(company.affiliations)&&company.affiliations.length)return company.affiliations;
 const first={id:`${company.id}-org-1`,org:company.org,account:company.account,kind:company.kind,type:company.type,owner:company.owner,phone:company.phone,supervisor:company.supervisor};
 if(['company-2','company-6'].includes(company.id))return [{...first,org:organizations[1],type:company.id==='company-2'?'工程检验':first.type},{...first,id:`${company.id}-org-2`,org:organizations[2],account:`${company.account}-B`,kind:'长期相关方',type:'动土施工',owner:'示例负责人乙',supervisor:'示例监管人乙'}];
 return [first];
}
export const staffExamples=[
 {id:'staff-demo-1',companyId:'company-1',name:'示例陈卓越',phone:'138****0001',account:'DEMO-P001',position:'安全员',department:'示例卓越制造有限公司',managerType:'项目负责人',projects:[{id:'proj-demo-1',name:'示例设备安装项目',role:'项目负责人',org:organizations[1]},{id:'proj-demo-2',name:'示例厂区维保项目',role:'项目负责人',org:organizations[2]}],special:false,overLegalAge:false,healthExpiry:'2027-10-01',status:'服务中',org:organizations[1],gender:'男',age:38,created:'2026-10-16 09:00:00'},
 {id:'staff-demo-2',companyId:'company-1',name:'示例李月华',phone:'138****0002',account:'DEMO-P002',position:'技工',department:'示例卓越制造有限公司',managerType:'否',projects:[{id:'proj-demo-1',name:'示例设备安装项目',role:'普通作业人员',org:organizations[1]},{id:'proj-demo-2',name:'示例厂区维保项目',role:'普通作业人员',org:organizations[2]}],special:false,overLegalAge:false,healthExpiry:'2026-09-01',status:'服务中',org:organizations[1],gender:'女',age:32,created:'2026-10-16 09:00:00'},
 {id:'staff-demo-3',companyId:'company-1',name:'示例测试人员',phone:'138****0003',account:'DEMO-P003',position:'--',department:'示例卓越制造有限公司',managerType:'否',projects:[{id:'proj-demo-1',name:'示例设备安装项目',role:'普通作业人员',org:organizations[1]}],special:false,overLegalAge:false,healthExpiry:'2027-10-01',status:'服务中',org:organizations[1],gender:'男',age:28,created:'2026-10-16 09:00:00'}
];
seed.companies=seed.companies.map(c=>({...c,affiliations:affiliations(c)}));
seed.people=staffExamples;
export {seed};
