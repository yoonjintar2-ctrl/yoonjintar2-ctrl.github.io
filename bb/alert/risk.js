// 클석진 반반도체 지수(통칭 '반반도체지수', v4) — 반도체 급락 위험 0~100 + 충격 뒤 '추가 하락' 점수 — 실시간 계산. tossinvest.com 탭에서 eval. 주문 기능 없음.
// FRED 자료는 맥 크롬의 FRED 탭(fredwatch.js)이 1시간마다 받아 ntfy(-f 토픽)에 첨부로 올려 둠 → 여기서 받아 계산.
// 반반도체지수 v5 (2026-10-14): 두 축 중 낮은 값(둘 다 높아야 높음)
//   ① 급락 위험 축(v4): 10년 금리 수준 · NFCI 13주 · 순유동성 13주 감소 · 원달러 수준(3년) · 기대인플레 20일 하락 · 유가 20일 하락 · 가이던스 감속 · 장단기차 축소 · 2년 금리 120일 상승
//      → 급락 확률은 잘 맞히지만 2023~26엔 높을 때 오히려 크게 오르기도 함(양방향 '출렁임' 지표). 위험 모드 현금이 2023~26엔 손해(SOXL 97.8→86.5%)
//   ② 반도체 사이클 축(새로): 순유동성 감소 · 반도체 매출 성장 감속(분기) · 10년 금리 · 미국 반도체 가동률(생산/능력, 3년 대비) · 반도체 19개사 매출 성장(TTM, 3년 대비, 사이클 고점) · 장단기차 축소 · 2년 금리 120일 상승
//      → 60일 뒤 하락 예측이 세 기간 모두 일관(높을 때 60일 수익 4.1 vs 7.6 / −6.1 vs 10.9 / −4.2 vs 11.6%)
//   둘 다 90 이상일 때만 위험 모드: SOXL 2013~18 49.8→58.6% · 2019~22 13.2→53.5% · 2023~26 97.8→155.6%, SOXX 19.5→21.7 / 21.5→32.1 / 50.4→60.0% (세 기간 모두 나음, 위험 모드 6~14%의 날)
//   주의: 요인·조합을 같은 기간에서 골랐으므로 실전은 이보다 못할 수 있음. 매출 자료는 SEC 공시(분기 매출, 제출일 기준)를 주 단위로 넣어 둠 → 실적 시즌마다 갱신 필요(마지막 2026-10-12)
// 추가 하락 점수 (반도체가 20일 고점 대비 −8% 이상 빠진 '충격' 상태에서만): 그 뒤 20일 안 −7% 더 빠질 확률
//   반반도체지수·NFCI 13주·원달러 20일·기대인플레 20일(−)·달러 20일·시장 전체 하락 여부·VIX/VIX3M·5일 수익률을 직전 3년 백분위로 평균
//   2010~2018에서 고른 요인 → 2018~2026 AUC 0.65. 상위 1/3이면 52%, 하위 1/3이면 15%(기준 30%)
// await window.__risk() → { d, v, lv, h:[최근 10일], sh:{dd, cs, t, p} | null }
(function () {
  const INFO = 'https://wts-info-api.tossinvest.com';
  const FTOPIC = 'berry-3059012bcc6b7db9-f';
  const get = async (u) => { const r = await fetch(u, { credentials: 'include' }); if (!r.ok) throw new Error(r.status + ' ' + u); return r.json(); };
  // 반도체 16개사 가이던스 성장률 가속/감속(실적 시즌마다 갱신, 2026-10-14까지). 'YYMMDD:값×1e5'
  const DGP = '210121:-9169,210126:-2633,210127:-694,210128:2422,210201:1762,210203:-2502,210204:-280,210217:187,210304:-229,210331:906,210421:383,210422:1424,210427:1722,210428:6226,210429:6352,210503:7115,210504:6246,210519:5882,210603:6561,210630:5272,210721:4626,210727:3649,210728:-1722,210802:-2900,210804:-4112,210809:-4241,210830:-4595,210902:-4425,210928:-5757,211020:-5874,211022:-6047,211026:-6877,211027:1859,211028:1419,211101:2026,211103:989,211209:-24,211220:1904,220125:2548,220126:1799,220127:1225,220201:1335,220202:212,220207:-2868,220210:-1957,220216:-1452,220303:2607,220329:3211,220420:3514,220426:2979,220427:6840,220428:6795,220502:6751,220509:7465,220513:8050,220518:7708,220525:7115,220526:3269,220630:226,220721:-606,220726:225,220727:-2123,220801:-3338,220805:-5777,220808:-4985,220817:-4957,220824:-6045,220825:-6081,220901:-6055,220929:-5356,221006:-3774,221019:-4307,221025:-5463,221026:-5123,221027:-3981,221031:-4312,221102:-6359,221122:-6587,221201:-7349,221205:-6967,221208:-7548,221221:-3516,230117:-5362,230124:-3957,230125:-4665,230126:-3636,230131:-4575,230202:-2448,230206:-1400,230208:-975,230215:-590,230302:461,230328:-998,230419:1443,230420:-253,230425:-199,230426:-801,230427:3571,230501:4599,230502:6605,230503:5509,230504:5159,230508:4872,230524:4542,230525:5102,230601:5491,230628:5263,230725:4923,230726:7438,230727:3502,230731:3315,230801:3516,230802:4413,230817:4564,230823:4294,230831:4248,230905:3884,230927:4040,231018:2067,231024:1218,231025:1493,231026:2199,231030:1051,231031:440,231101:480,231121:1302,231130:1180,231211:1043,231220:803,240123:1359,240124:45,240125:-3236,240130:-4410,240131:-6749,240205:-5987,240207:-4878,240221:-5786,240307:-7140,240320:-7229,240423:-5527,240424:-4846,240425:1224,240429:1313,240501:3179,240506:3303,240510:5047,240522:8468,240530:12048,240626:11824,240723:10425,240724:10495,240725:6633,240729:7154,240731:7597,240801:6217,240815:6154,240821:4518,240828:3173,240829:1686,240905:1751,240925:1912,241022:398,241023:6,241024:6665,241028:6107,241030:4137,241031:4353,241106:3953,241114:3573,241126:3181,241203:3092,241209:3253,241212:2861,241218:1380,250121:675,250123:1949,250129:2251,250130:48,250203:-6060,250205:-7151,250206:-5994,250210:-6895,250213:-7014,250219:-5971,250305:-7426,250306:-7482,250320:-4617,250423:-4504,250424:-2652,250429:896,250430:-1436,250501:-1379,250505:1130,250506:1885,250515:2201,250522:1801,250528:1310,250529:1987,250605:2575,250625:1775,250722:993,250724:1063,250729:-787,250730:4030,250731:4242,250804:3231,250805:4551,250814:3846,250820:3787,250827:4931,250828:4376,250904:4280,250923:3672,251021:3186,251022:3332,251023:2557,251028:2581,251029:1960,251030:1259,251103:826,251104:-1235,251105:-1494,251113:-398,251125:-596,251202:-231,251208:-1083,251211:-1510,251217:438,260122:204,260127:1435,260128:2176,260129:2467,260203:885,260204:-786,260205:-72,260209:109,260212:70,260213:700,260218:1590,260225:1426,260304:2111,260305:2034,260318:580,260422:232,260423:1751,260428:2267,260429:3719,260430:4017,260504:4597,260514:4328,260520:3387,260527:3473,260603:4141,260624:2695,260722:2333,260723:1060,260728:679,260729:2290,260730:2120,260803:1720,260804:2140,260805:1947,260810:2051,260813:1755,260819:1905,260826:2138,260827:2127,260902:34,260930:821';
  // 반도체 19개사 매출 성장(SEC 공시, 제출일 기준, 주 단위): '2011-01-01부터 일수_TTM 성장×1000_최근 분기 전년비×1000'(36진법). 실적 시즌마다 갱신
  const RGP = '49_6p_68,4g_6j_62,5m_6v_5o,67_6b_52,6e_4r_4a,6l_50_4i,6s_4n_46,6z_4l_48,8c_4c_3h,8j_4c_3j,8q_49_3x,94_49_3u,9i_3p_2y,ah_3j_35,b2_3n_2o,b9_3g_2j,bn_3w_22,bu_3a_2b,c1_3a_2a,c8_3c_25,cm_3b_21,d0_37_1z,d7_35_1q,dl_3f_2x,ds_2w_1l,e6_2m_1m,ed_2l_1m,ek_2m_1q,fj_2n_1y,fq_2n_1w,g4_29_24,gb_2b_23,gp_2j_3b,h3_2i_38,in_1v_1k,iu_1x_o,j1_1x_p,j8_1x_s,jf_1w_r,jm_1x_p,kl_1w_n,l6_20_u,ld_2g_17,lk_2h_18,lr_1t_1d,ly_1o_16,m5_1r_14,mc_1r_15,mx_1s_1b,n4_1v_1j,ni_1v_1f,np_1a_d,nw_1a_-a,o3_18_-c,oa_18_-e,oh_19_-d,oo_19_-g,ov_18_-g,pn_19_-f,q1_1d_-4,q8_15_-7,qf_m_-c,qm_k_-c,qt_-1_-1d,r0_0_-1c,r7_1_-1b,rl_1_-19,sr_0_15,sy_4_15,t5_4_17,tc_2_15,tq_7_1n,tx_9_1r,ub_a_1t,up_p_2q,va_h_24,vh_6_2h,vo_6_2g,vv_o_32,w2_p_33,w9_q_35,wg_q_3a,wu_r_3a,x8_13_35,xm_x_2w,xt_1b_2u,y0_1l_36,ye_1t_32,ys_1v_34,yz_1w_34,zr_26_2u,105_1y_32,10c_2d_3m,10j_2e_3n,10q_2n_3m,10x_30_3i,114_30_3f,11b_32_3d,11p_35_3q,12v_3e_36,132_3b_3a,139_3b_39,13g_3d_39,13u_3c_35,141_3d_37,148_3c_37,14m_3h_3c,150_34_2o,15e_32_2u,15l_33_2q,15s_32_2k,15z_2x_25,166_2v_25,16d_2v_26,16k_30_26,16y_2z_24,17j_2m_1u,17q_2o_1v,17x_2g_17,184_2h_16,18b_2h_14,18i_2f_10,18p_2e_10,18w_2c_x,193_2g_x,1a2_25_s,1a9_1w_-6,1ag_1i_-n,1an_1g_-t,1au_1e_-w,1b1_1d_-t,1b8_1b_-10,1bm_1a_-19,1cs_1a_-1a,1cz_s_-18,1d6_c_-1h,1dd_7_-1k,1dk_7_-1j,1dr_7_-1i,1e5_6_-1l,1ec_3_-1p,1f4_-7_-20,1fi_-g_-21,1fp_-l_-23,1fw_-n_-23,1g3_-r_-1z,1ga_-v_-25,1gh_-w_-25,1go_-10_-27,1gv_-z_-26,1hn_-16_-27,1hu_-1g_-27,1i1_-1g_-2d,1i8_-1g_-23,1if_-1l_-28,1im_-1l_-26,1it_-1l_-24,1j7_-1g_-11,1jz_-1k_-v,1kd_-1i_3,1kk_-1f_9,1kr_-1a_0,1ky_-18_n,1l5_-19_q,1lc_-17_10,1lj_-13_1n,1lq_-u_1s,1mw_-t_1r,1n3_-s_1u,1na_-3_3a,1nh_9_3y,1nv_b_46,1o9_c_48,1og_h_4l,1ou_s_4q,1p8_12_5d,1pm_1f_51,1pt_1h_5c,1q0_1u_5h,1q7_1v_5m,1qe_2d_5o,1ql_2j_61,1qs_2v_63,1rd_3d_6s,1ry_3j_6c,1s5_3o_6j,1sc_3y_6v,1sj_4j_7a,1sq_4i_78,1sx_4r_76,1t4_4v_7b,1tb_4n_61,1u3_59_6n,1uh_54_6h,1uo_58_6l,1uv_5b_6l,1v2_5c_5z,1v9_5h_60,1vg_5m_5x,1vn_5v_5m,1vu_5l_5l,1x7_62_4z,1xe_5x_5d,1xl_5s_4p,1xz_5u_4j,1yd_5t_4j,1yr_5r_49,1zx_5r_4d,204_5j_4c,20i_5a_4d,20p_5c_4g,213_53_4p,21g_57_4k,21o_58_4n,229_5b_4t,22g_59_5f,22n_50_5f,22u_50_5d,231_50_5n,238_4z_5k,23f_4z_5i,23m_4z_5b,240_4v_4z,24s_50_4x,24z_52_5d,256_56_5m,25d_53_59,25k_4z_4z,25r_4t_4w,265_4t_4s,274_4o_4s,27b_4j_4b,27i_4q_4b,27p_4q_3u,27w_4p_3s,28a_4m_3q,28o_4k_3h,28v_4b_2x,292_4a_2w,2a1_41_2f,2a8_3x_14,2af_3v_12,2am_3g_a,2at_3e_7,2b0_3d_7,2be_2r_-10,2bl_2r_-11,2ck_24_-1w,2cr_1x_-21,2cy_1n_-26,2d5_1d_-2f,2dc_1e_-2g,2dj_1e_-2h,2dx_1d_-2h,2e4_r_-33,2f3_q_-1e,2fa_l_-1j,2fh_g_-1b,2fo_3_-1e,2fv_-4_-1g,2g2_-5_-1h,2gg_-5_-1i,2h8_-s_-1q,2hm_-15_-14,2ht_-1d_-36,2i0_-1j_-2u,2ie_-1k_-2v,2il_-1m_-2x,2iz_-1n_-2o,2j6_-22_-2f,2k5_-22_-1t,2kc_-1u_-t,2kj_-1q_-f,2kq_-1k_d,2l4_-1j_f,2li_-1l_b,2lp_-1k_15,2mh_-1k_17,2mo_-v_2f,2mv_-u_2f,2n2_-n_2o,2n9_-b_2p,2ng_-d_2q,2nn_-d_2r,2o1_-e_2v,2oe_0_3q,2p0_0_3n,2p7_-h_u,2pe_-h_v,2pl_-e_o,2ps_4_1a,2q6_d_1d,2qk_d_1e,2rj_y_1u,2rq_13_d,2rx_1m_44,2s4_1q_3r,2sb_1y_3x,2si_1z_3z,2sw_20_3z,2t3_25_40,2t9_26_46,2tv_2l_3w,2u9_2d_47,2ug_2t_40,2un_2w_48,2uu_2z_4d,2v1_2v_48,2v8_2y_4a,2vm_32_4c,2w7_3c_4o,2ws_3j_5a,2wz_3i_5l,2x6_3j_5p,2xd_3m_5r,2xk_3w_6c,2xy_3x_6c,2y5_3z_6e,2yj_44_6k,2z4_4b_6q,2zb_4y_73,2zi_57_7d,2zp_59_7k,2zw_5d_7i,303_5k_7h,30a_5l_7t,30h_5n_7u,31g_5q_7v,31u_66_7x,321_64_6t,328_64_6r,32m_65_6k,330_69_6t,33d_6a_6k,33s_6e_6h,34d_6j_63,34k_6l_6g,34r_6l_6e,34y_6p_6i,355_6q_6b,35j_6r_6d,35x_6s_6g,364_6s_6a,36w_6k_64,373_6j_5h,37a_6i_5f,37h_6l_5h,37o_6h_5a,37v_6h_59,382_6i_5e,38u_6e_58,39f_67_54,39m_5u_46,39t_5p_3y,3a0_5t_3y,3a7_5f_3n,3ae_56_2r,3al_58_2u,3bk_4v_1w,3by_4m_1r,3c5_40_v,3cc_40_x,3cq_3o_c,3d4_3n_b,3di_35_-9,3eh_30_-b,3eo_24_-1y,3ev_1t_-2d,3f2_1r_-2g,3f9_1o_-2i,3fg_18_-2u,3fn_17_-2z,3g8_r_-34,3h0_k_-3i,3h7_-l_-4g,3he_-q_-4f,3hs_-t_-4i,3hz_-15_-4e,3i6_-17_-4k,3ir_-1o_-4q,3jj_-1t_-4r,3jq_-2d_-41,3jx_-2h_-45,3k4_-2m_-4h,3kb_-2u_-4r,3ki_-2e_-2k,3kp_-2h_-2m,3lo_-2k_-20,3m2_-2u_-22,3m9_-35_-1c,3mg_-36_-13,3mu_-2b_e,3n8_-2c_e,3nf_-2f_e,3nm_-26_1f,3os_-1s_39,3oz_-1u_3b,3p6_-1q_3m,3pd_-i_4v,3pk_-k_4v,3py_-f_5s,3q5_2_6a,3r4_1_69,3rb_12_77,3ri_12_78,3rw_u_6x,3s3_2e_7s,3sa_2e_7r,3sh_2m_80,3sv_3a_8b,3tn_3a_88,3tu_3l_8k,3u1_3y_8e,3uf_3y_8n,3um_4t_7l,3ut_4u_7m,3v0_54_7r,3vs_5o_7y,3w6_5p_81,3wd_6l_8f,3wk_6z_88,3wy_74_7y,3x5_75_85,3xc_76_86,3xq_7g_85,3xx_7t_8a,3yw_7w_8a,3z3_84_89,3za_83_8b,3zh_89_8j,3zo_7y_8a,3zv_7z_8a,402_7x_7n,40g_7w_73,418_80_79,41f_84_7w,41m_8b_80,420_8i_87,427_83_88,42e_85_8c,42l_7z_87,42z_7v_86,43r_7w_88,43y_7z_83,445_86_83,44c_85_85,44j_89_85,44q_7x_7i,44x_7z_7i,454_7t_7k,45w_7q_7r,46a_7t_7q,46h_7u_7q,46o_7t_75,472_7t_81,479_7w_81,47g_7x_7z,47u_7q_88,490_7s_7w,497_7k_7p,49e_7m_7o,49l_7o_7u,49s_82_91,4a6_83_90,4ad_8u_bc,4bj_8s_bw,4bq_91_ct,4c4_9v_eh,4cb_9u_eh,4cp_a1_f2,4d3_bn_ib,4e2_bq_iv,4e9_bw_j4,4eg_bw_j5,4en_bz_ja,4eu_dc_lb,4f1_db_lc,4f8_dt_mh,4g4_fr_o9';
  const rgRows = RGP.split(',').map(x => { const [d, a, b] = x.split('_').map(v => parseInt(v, 36)); const t = new Date(Date.UTC(2011, 0, 1) + d * 864e5).toISOString().slice(0, 10); return [t, a / 1000, b / 1000]; });
  const dgRows = DGP.split(',').map(s => { const [d, v] = s.split(':'); return ['20' + d.slice(0, 2) + '-' + d.slice(2, 4) + '-' + d.slice(4, 6), +v / 1e5]; });
  const W = { y10: [252, 1], nfci: [252, 1], liq: [252, -1], krwL: [756, 1], bei: [252, -1], oil: [252, -1], dg: [252, -1], curve: [252, -1], y2c: [252, 1] }; // [z점수 기간, 방향]

  // 날짜 D[]에 맞춰 앞값 채우기. lag=1이면 전날까지 나온 값만(미리 알 수 없는 값 안 씀)
  const align = (D, rows, lag) => { const out = new Array(D.length).fill(null); let j = 0, last = null; const r = (rows || []).slice().sort((a, b) => a[0] < b[0] ? -1 : 1); for (let i = 0; i < D.length; i++) { while (j < r.length && r[j][0] <= D[i]) { last = r[j][1]; j++; } out[i] = last; } return lag ? D.map((_, i) => i >= lag ? out[i - lag] : null) : out; };
  const zs = (a, t, L) => { let s = 0, ss = 0, m = 0; for (let k = Math.max(0, t - L + 1); k <= t; k++) { const v = a[k]; if (v == null || !isFinite(v)) continue; s += v; ss += v * v; m++; } if (m < L * 0.6 || a[t] == null || !isFinite(a[t])) return null; const mu = s / m, sd = Math.sqrt(Math.max(ss / m - mu * mu, 1e-18)); return (a[t] - mu) / sd; };
  const pctOf = (a, t, L, minN) => { const v = a[t]; if (v == null || !isFinite(v)) return null; let b = 0, m = 0; for (let k = Math.max(0, t - L); k < t; k++) { const u = a[k]; if (u == null || !isFinite(u)) continue; m++; if (u < v) b++; } return m >= minN ? b / m : null; };

  // P: {SERIES:[[date,value],...]} (FRED) · spy/sox: {date: close}
  window.__riskCalc = function (P, spy, sox) {
    const D = Object.keys(spy).filter(d => d >= '2009-01-01').sort(); const n = D.length;
    const A = {}; for (const k of ['DGS10', 'NFCI', 'WALCL', 'WTREGEN', 'RRPONTSYD', 'DEXKOUS', 'T10YIE', 'DCOILWTICO', 'DTWEXBGS', 'VIXCLS', 'VXVCLS', 'DGS2', 'T10Y2Y']) A[k] = align(D, P[k], 1);
    // 월간 자료는 발표가 늦어서(생산·능력 약 45일) 그만큼 늦춰서 씀
    const addD = (d, k) => new Date(Date.parse(d + 'T00:00:00Z') + k * 864e5).toISOString().slice(0, 10);
    const ipm = {}; (P.CAPG3344S || []).forEach(r => ipm[r[0]] = r[1]);
    const util = align(D, (P.IPG3344S || []).filter(r => ipm[r[0]]).map(r => [addD(r[0], 45), r[1] / ipm[r[0]]]), 1);
    const revT = align(D, rgRows.map(r => [r[0], r[1]]), 1), revQ = align(D, rgRows.map(r => [r[0], r[2]]), 1);
    const dg = align(D, dgRows, 0).map((v, i) => D[i] >= '2021-01-21' ? v : null);
    const ch = (a, k, rel) => a.map((v, i) => i >= k && v != null && a[i - k] != null && (!rel || a[i - k]) ? (rel ? v / a[i - k] - 1 : v - a[i - k]) : null);
    const L = A.WALCL.map((w, i) => w != null && A.WTREGEN[i] != null ? w - A.WTREGEN[i] - (A.RRPONTSYD[i] || 0) * 1000 : null);
    const F = { y10: A.DGS10, nfci: ch(A.NFCI, 65), liq: ch(L, 65, true), krwL: A.DEXKOUS, krw: ch(A.DEXKOUS, 20, true), bei: ch(A.T10YIE, 20), oil: ch(A.DCOILWTICO, 20, true), dg, curve: A.T10Y2Y, y2c: ch(A.DGS2, 120) };
    const comp = new Array(n).fill(null);
    for (let t = 0; t < n; t++) { let s = 0, m = 0, ok = true; for (const k in W) { const z = zs(F[k], t, W[k][0]); if (z == null) { if (k === 'dg') continue; ok = false; break; } s += W[k][1] * z; m++; } if (ok) comp[t] = s / m; }
    const idxR = comp.map((_, t) => { const p = pctOf(comp, t, 756, 200); return p == null ? null : Math.round(p * 100); });
    // ② 사이클 축
    const WC = { liq: [252, -1], acc: [252, -1], y10: [252, 1], util: [756, 1], rev: [756, 1], curve: [252, -1], y2c: [252, 1] };
    const FC = { liq: F.liq, acc: ch(revQ, 90), y10: F.y10, util, rev: revT, curve: F.curve, y2c: F.y2c };
    const compC = new Array(n).fill(null);
    for (let t = 0; t < n; t++) { let s = 0, m = 0, ok = true; for (const k in WC) { const z = zs(FC[k], t, WC[k][0]); if (z == null) { ok = false; break; } s += WC[k][1] * z; m++; } if (ok) compC[t] = s / m; }
    const idxC = compC.map((_, t) => { const p = pctOf(compC, t, 756, 200); return p == null ? null : Math.round(p * 100); });
    const idx = idxR.map((r, t) => r == null ? null : idxC[t] == null ? r : Math.min(r, idxC[t]));
    // 충격 뒤 추가 하락 점수
    const sx = D.map(d => sox[d] ?? null), sp = D.map(d => spy[d]);
    const sxdd = (t) => { let mx = 0; for (let k = t - 20; k < t; k++) if (sx[k] != null) mx = Math.max(mx, sx[k]); return mx && sx[t] != null ? sx[t] / mx - 1 : null; };
    const spdd = (t) => { let mx = 0; for (let k = t - 20; k <= t; k++) mx = Math.max(mx, sp[k] || 0); return sp[t] / mx - 1; };
    const SF = [
      [idxR, 1], [F.nfci, 1], [F.krw, 1], [F.bei, -1], [ch(A.DTWEXBGS, 20, true), 1],
      [D.map((_, t) => t >= 21 ? (sxdd(t) == null ? null : sxdd(t) - spdd(t)) : null), 1], // 반도체만이 아니라 시장 전체가 빠질수록 더 이어짐
      [A.VIXCLS.map((v, i) => v != null && A.VXVCLS[i] ? v / A.VXVCLS[i] : null), 1],
      [sx.map((v, i) => i >= 5 && v != null && sx[i - 5] ? v / sx[i - 5] - 1 : null), 1] // 천천히 빠질수록 더 이어짐(하루 폭락은 반등이 잦음)
    ];
    const cscore = (t) => { let s = 0, m = 0; for (const [a, sg] of SF) { const p = pctOf(a, t, 756, 150); if (p == null) continue; s += sg > 0 ? p : 1 - p; m++; } return m >= 5 ? s / m : null; };
    // 과거 충격(20일 고점 −8%, 15일 간격) → 점수 1/3 경계와 구간별 실제 확률
    const ev = []; let cool = -1;
    for (let t = 21; t < n - 20; t++) { const dd = sxdd(t); if (dd != null && dd <= -0.08 && t > cool) { const c = cscore(t); cool = t + 15; if (c == null) continue; let mn = 1e9; for (let k = t + 1; k <= t + 20; k++) if (sx[k] != null) mn = Math.min(mn, sx[k]); ev.push({ t, c, y: mn / sx[t] - 1 <= -0.07 ? 1 : 0 }); } }
    const cs = ev.map(e => e.c).sort((a, b) => a - b), q1 = cs[Math.floor(cs.length / 3)], q2 = cs[Math.floor(cs.length * 2 / 3)];
    const rate = (f) => { const g = ev.filter(f); return g.length ? Math.round(g.filter(e => e.y).length / g.length * 100) : null; };
    const R = [rate(e => e.c < q1), rate(e => e.c >= q1 && e.c < q2), rate(e => e.c >= q2)];
    const t = n - 1, v = idx[t], dd = sxdd(t);
    let sh = null;
    if (dd != null && dd <= -0.08) { const c = cscore(t); if (c != null) { const tier = c >= q2 ? 2 : c >= q1 ? 1 : 0; sh = { dd: +(dd * 100).toFixed(1), cs: Math.round(c * 100), t: tier, p: R[tier], base: rate(() => true), n: ev.length }; } }
    const lv = v == null ? '-' : v >= 90 ? '위험 모드' : v >= 80 ? '경계' : v >= 60 ? '주의' : '보통';
    return { d: D[t], v, lv, vr: idxR[t], vc: idxC[t], h: idx.slice(-10), sh, dd: dd == null ? null : +(dd * 100).toFixed(1), cut: [q1, q2].map(x => Math.round(x * 100)), rates: R, _idx: idx, _idxR: idxR, _idxC: idxC, _D: D, _cs: cscore, _sxdd: sxdd, _q: [q1, q2] };
  };

  const hist = async (sym) => { const j0 = await get(`${INFO}/api/v2/stock-infos/code-or-symbol/${sym}`); const c = j0.result.code || j0.result.stockCode; let cs = [], from = '';
    for (let p = 0; p < 12; p++) { const j = await get(`${INFO}/api/v1/c-chart/us-s/${c}/day:1?count=400&useAdjustedRate=true` + (from ? `&from=${encodeURIComponent(from)}` : '')); const k = j.result.candles || []; cs = k.slice().reverse().concat(cs); from = j.result.nextDateTime; if (!from || k.length < 400 || cs[0].dt < '2009') break; }
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false }).formatToParts(new Date()).map(x => [x.type, x.value]));
    const today = p.year + '-' + p.month + '-' + p.day, done = +p.hour % 24 >= 16;
    const m = {}; cs.forEach(x => { const d = x.dt.slice(0, 10); if (d < today || (d === today && done)) m[d] = x.close; }); return m; };

  // FRED 묶음: 맥이 올린 최신 첨부. 못 받으면 마지막으로 받은 것(3일 이내)
  const fredPack = async () => {
    try {
      const t = await (await fetch(`https://ntfy.sh/${FTOPIC}/json?poll=1&since=12h`, { cache: 'no-store' })).text();
      const ms = t.split('\n').filter(Boolean).map(l => { try { return JSON.parse(l); } catch (e) { return null; } }).filter(m => m && m.attachment && m.attachment.url);
      if (ms.length) { const m = ms[ms.length - 1]; const P = await (await fetch(m.attachment.url, { cache: 'no-store' })).json(); if (P && P.DGS10) { try { localStorage.setItem('fredpack', JSON.stringify({ t: m.time, P })); } catch (e) {} return { t: m.time, P }; } }
    } catch (e) {}
    try { const o = JSON.parse(localStorage.getItem('fredpack') || 'null'); if (o && Date.now() / 1000 - o.t < 3 * 86400) return o; } catch (e) {}
    return null;
  };

  // 지금 반도체 주식을 어떻게 하면 좋을지 한 줄(참고 의견)
  const opinion = (v, sh) => {
    if (sh) return ['반도체 급락 중 · 과거엔 대부분 여기서 멈춤 → 나눠서 조금씩 매수 고려', '반도체 급락 중 · 추가 하락 반반 → 서두르지 말고 나눠서', '반도체 급락 중 · 더 빠질 가능성 높음 → 바닥 잡기 서두르지 말기'][sh.t];
    if (v == null) return '';
    if (v >= 90) return '위험 모드 → 반도체·레버리지 비중 줄이고, 새로 살 땐 평소의 절반만';
    if (v >= 80) return '경계 → 레버리지 새 매수는 자제, 1배 보유는 유지';
    if (v >= 60) return '주의 → 평소대로, 레버리지는 가볍게';
    return '보통 → 평소대로 운용';
  };
  window.__risk = async function (opt) {
    const F = await fredPack(); if (!F) return null;
    const [spy, sox] = await Promise.all([hist('SPY'), hist('SOXX')]);
    const r = window.__riskCalc(F.P, spy, sox);
    const out = { d: r.d, v: r.v, lv: r.lv, vr: r.vr, vc: r.vc, h: r.h, sh: r.sh, dd: r.dd, op: opinion(r.v, r.sh), ft: F.t };
    if (opt && opt.hist) { const i0 = r._D.findIndex((d, i) => r._idx[i] != null); out.H = { D: r._D.slice(i0), v: r._idx.slice(i0), vr: r._idxR.slice(i0), vc: r._idxC.slice(i0), sox: r._D.slice(i0).map(d => sox[d] == null ? null : +sox[d].toFixed(2)) }; }
    try { localStorage.setItem('riskLast', JSON.stringify(out)); } catch (e) {}
    return out;
  };

  // 알림: 90 넘어 '위험 모드'에 처음 들어갈 때(80 밑으로 내려가야 다시 울림) · 반도체 충격(−8%)이 새로 시작될 때
  window.__riskAlert = async function (rk, topic) {
    if (!rk || rk.v == null) return [];
    let s = {}; try { s = JSON.parse(localStorage.getItem('riskAlert') || '{}'); } catch (e) {}
    const sent = [];
    const post = async (title, message, pr) => { const r = await fetch('https://ntfy.sh/', { method: 'POST', body: JSON.stringify({ topic, title, message, tags: ['warn', 'risk'], priority: pr }) }); if (r.status === 200) sent.push(title); };
    if (rk.v >= 90 && !s.hi) {
      await post(`반반도체지수 ${rk.v} · 위험 모드`, `클석진 반반도체 지수가 ${rk.v}(0~100)로 위험 모드에 들어갔어요.\n과거엔 이 구간에서 20일 안 반도체 −10% 급락 확률이 평소의 약 2.5배였어요.\nTQQQ(②③⑥)와 ⑧ 반도체주 매수 의견은 평소의 절반만 사는 걸 권해요. 레버리지 비중도 줄여 두세요.`, 4);
      s.hi = rk.d;
    } else if (rk.v < 80 && s.hi) { s.hi = null; }
    if (rk.sh && (!s.sh || (Date.parse(rk.d) - Date.parse(s.sh)) / 86400e3 > 21)) {
      const lab = ['낮음', '보통', '높음'][rk.sh.t];
      await post(`반도체 급락 ${rk.sh.dd}% · 추가 하락 가능성 ${lab}`, `반도체(SOXX)가 20일 고점보다 ${rk.sh.dd}% 빠졌어요. 추가 하락 점수 ${rk.sh.cs}(${lab}).\n과거 같은 구간에서 20일 안 −7% 더 빠진 비율 ${rk.sh.p}%(평균 ${rk.sh.base}%).${rk.sh.t === 2 ? '\n바닥 잡기는 서두르지 마세요.' : rk.sh.t === 0 ? '\n과거엔 대부분 이 근처에서 멈췄어요.' : ''}`, rk.sh.t === 2 ? 4 : 3);
      s.sh = rk.d;
    }
    try { localStorage.setItem('riskAlert', JSON.stringify(s)); } catch (e) {}
    return sent;
  };

  // 일봉 그래프용 전체 기록(2013~): ntfy(-k)에 첨부로 올림 → 웹 팝업이 받아 그림. 첨부는 3시간 뒤 사라져서 1시간마다 다시 올림
  window.__riskHistPush = async function () {
    const r = await window.__risk({ hist: true }); if (!r || !r.H) return 'no data';
    const body = JSON.stringify({ v: 2, d: r.d, now: { v: r.v, vr: r.vr, vc: r.vc, lv: r.lv, op: r.op, dd: r.dd, sh: r.sh }, D: r.H.D, x: r.H.v, xr: r.H.vr, xc: r.H.vc, s: r.H.sox });
    const res = await fetch('https://ntfy.sh/berry-3059012bcc6b7db9-k', { method: 'PUT', headers: { Filename: 'banban.json', Title: 'banban ' + r.d }, body });
    return res.status + ' ' + r.H.D.length + '일';
  };
})();
'risk v5 loaded';
