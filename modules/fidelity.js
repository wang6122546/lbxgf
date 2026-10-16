import {esc,table,modal} from '../components/ui.js?v=review-20261016-3';
import {repo} from '../services/repository.js?v=review-20261016-3';
export function renderWorkflow(container){
 const rows=[['第一道安全防线','资质培训，合规入库',['相关方自主合规录入信息','必学培训课程','在线学习，通过才能作业']],['第二道安全防线','严控作业票入场审批',['严控作业票入场审批','作业票审批，系统即时通知']],['第三道安全防线','作业过程智能监控',['视频智能监管，及时预警','隐患排查，违规上报']],['第四道安全防线','人企量化评价，优胜劣汰',['数据汇聚，人企安全履历','人企量化评估模型，决策依据']]];
 let image=0;
 container.innerHTML=`<div class="source-workflow"><div class="content-box"><div class="workflow-top">相关方全流程管理，建立四道安全防线，打造相关方高质量人才队伍</div><div class="process"><div class="p-title">流程管理</div><div class="p-line">${rows.map(([title,subtitle,items],i)=>`<div class="p-text"><div class="p-text-1"><div class="p-label p-label-${i}"><div class="p-label-text"><div class="p-first">${title}</div><div class="p-bottom">${subtitle}</div></div><div class="p-text-img"></div></div><div class="p-text-2">${items.map(text=>`<div class="p-text-3"><img class="p-text-img2" src="../assets/original/workflow-${++image}.png" alt=""><div class="p-text-name">${text}</div></div>`).join('')}</div></div>${i<3?'<div class="line"></div>':''}</div>`).join('')}</div></div></div></div>`;
}
export async function showWorkDialog(id,tab='details'){
 const job=await repo.get('jobs',id); if(!job)return;
 const company=await repo.get('companies',job.companyId);
 const people=(await repo.list('people')).filter(p=>p.companyId===job.companyId&&p.jobId===id);
 const title=tab==='monitor'?'监测':'详情';
 modal(title,`<nav class="work-dialog-tabs" aria-label="作业信息"><button type="button" data-work-tab="details">作业详情</button><button type="button" data-work-tab="monitor">智能监测</button></nav><div id="work-dialog-content"></div>`,null,{readOnly:true});
 const root=document.querySelector('.modal');root.classList.add('source-work-drawer');root.closest('.modal-mask').classList.add('source-work-mask');
 const draw=(selected)=>{
  root.querySelectorAll('[data-work-tab]').forEach(b=>{b.classList.toggle('active',b.dataset.workTab===selected);b.setAttribute('aria-pressed',b.dataset.workTab===selected)});
  const content=root.querySelector('#work-dialog-content');
  if(selected==='monitor')content.innerHTML=table(['序号','监测设备','内容描述','监测时间点','图片'],[]);
  else content.innerHTML=`<section class="source-work-detail"><h2>作业基本详情</h2><div class="text"><p>作业类型：${esc(job.type)}</p><p>作业等级：${esc(job.level||'')}</p><p>作业位置：${esc(job.location)} <button type="button" class="work-location" data-location>查看位置</button></p><p>楼栋楼层：${esc(job.building||'')}${esc(job.floor||'')}</p>${job.status!=='申请中'?`<p>作业编号: ${esc(job.code)} <button type="button" class="work-location" data-ticket>查看作业票</button></p>`:''}<p>相关方企业：${esc(company?.name||'')}</p><p>作业申请人：${esc(job.applicant||'')}</p><p>作业负责人：${esc(job.owner||'')}</p><p>作业监护人：${esc(job.supervisor||'')}</p><p>作业实施时间：${esc(job.time.replace('~',' ~ '))}</p></div><div class="source-person-table"><h2>普通作业人员</h2>${table(['序号','姓名','岗位','部门','单位'],people.filter(x=>!x.special).map((p,i)=>[i+1,p.name,p.position,p.department,p.org]))}<h2>特殊作业人员</h2>${table(['序号','姓名','部门','单位','资格证书名称','资格证照片'],people.filter(x=>x.special).map((p,i)=>[i+1,p.name,p.department,p.org,p.certificate,'--']))}</div></section>`;
  content.querySelector('[data-location]')?.addEventListener('click',()=>{const box=document.createElement('section');box.className='source-location';box.innerHTML='<div class="source-location-title">位置<button type="button" aria-label="关闭位置">×</button></div><div class="source-location-map">暂无位置数据</div>';root.append(box);box.querySelector('button').onclick=()=>box.remove()});
  content.querySelector('[data-ticket]')?.addEventListener('click',()=>{const box=document.createElement('div');box.className='source-ticket-note';box.textContent='当前演示记录未关联作业票文件';content.prepend(box)});
 };
 root.querySelectorAll('[data-work-tab]').forEach(b=>b.onclick=()=>draw(b.dataset.workTab));draw(tab);
}
