
        // --- DATA PAYMENT (UPDATED) ---
        const dataPay = {
            // E-Wallet
            dana: { name: 'DANA', num: '08xxxx', img: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg' },
            shopee: { name: 'ShopeePay', num: '08xxxx', img: 'pay.jpg' }, // Placeholder
            gopay: { name: 'GoPay', num: '08xxxx', img: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg' },
            ovo: { name: 'OVO', num: '08xxxx', img: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg' },
            linkaja: { name: 'LinkAja', num: '08xxxx', img: 'link.jpg' },
            
            // Bank
            sea: { name: 'BCA', num: '08xxxx', img: 'bca.jpg' },
            sea2: { name: 'SeaBank', num: '08xxxx', img: 'bank.jpg' },
            bri: { name: 'BRI', num: '08xxxx', img: 'https://upload.wikimedia.org/wikipedia/commons/6/68/BANK_BRI_logo.svg' },

            // Pulsa
            pulsa: { name: 'Telkomsel', num: '08xxxx', img: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Telkomsel_2021_icon.svg' },
            indosat: { name: 'Indosat', num: '08xxxx', img: 'indosat.jpg' },
            tri: { name: 'Tri (3)', num: '08xxxx', img: 'tri.jpg' },
            smartfren: { name: 'Smartfren', num: '08xxxx', img: 'smr.jpg' }
        };

        // --- SOUND & UTILS ---
        const audio = document.getElementById('clickSound');
        const playTick = () => { audio.currentTime = 0; audio.play().catch(()=>{}); };

        // --- TYPING NAME ---
        const txtName = "WANZ TECNICAL";
        let i = 0;
        function typeWriter() {
            if(i < txtName.length) {
                document.getElementById('userName').innerHTML += txtName.charAt(i);
                i++; setTimeout(typeWriter, 80);
            }
        }
        setTimeout(typeWriter, 500);

        // --- CLOCK FUNCTION REMOVED ---
        // Kode jam dihapus agar tidak terjadi error di console.

        // --- NOTIFICATION SYSTEM (REALTIME) ---
        let notifCount = 0;
        const notifBadge = document.getElementById('notifBadge');
        const notifContainer = document.getElementById('notifList');

        function addLog(actionName) {
            notifCount++;
            notifBadge.innerText = notifCount;
            notifBadge.classList.add('show');
            
            const time = new Date().toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'});
            
            // Remove empty state if present
            if(notifContainer.querySelector('.empty-state')) {
                notifContainer.innerHTML = '';
            }

            const item = document.createElement('div');
            item.className = 'notif-item';
            item.innerHTML = `
                <div class="ni-icon"><i class="ri-file-list-3-line"></i></div>
                <div class="ni-text">
                    <h5>Membuka Menu: ${actionName}</h5>
                    <p>Tercatat pada ${time}</p>
                </div>
            `;
            notifContainer.prepend(item);
        }

        function toggleNotifPanel() {
            playTick();
            const p = document.getElementById('notifPanel');
            p.classList.toggle('active');
            if(p.classList.contains('active')) {
                // Reset badge saat dibuka
                notifCount = 0;
                notifBadge.classList.remove('show');
            }
        }

        // --- SHEET LOGIC ---
        const sheet = document.getElementById('sheet');
        const list = document.getElementById('sheetList');
        const title = document.getElementById('sheetTitle');

        function rowHtml(key) {
            const d = dataPay[key];
            // Fallback image if needed
            const imgUrl = d.img ? d.img : 'https://placehold.co/100'; 
            return `
                <div class="pay-item">
                    <div class="pi-left">
                        <img src="${imgUrl}" class="pi-img" onerror="this.src='https://placehold.co/100'">
                        <div class="pi-info">
                            <h5>${d.name}</h5>
                            <p id="t-${key}">${d.num}</p>
                        </div>
                    </div>
                    <button class="btn-action ripple" onclick="copyIt('t-${key}', '${d.name}')">
                        <i class="ri-file-copy-line"></i>
                    </button>
                </div>
            `;
        }

        window.openSheet = (mode) => {
            playTick();
            let html = '';
            let logName = '';

            if(mode === 'qris') {
                title.innerText = "SCAN QRIS";
                logName = "QRIS Payment";
                // Menggunakan placeholder QRIS online
                html = `
                    <div class="qris-display">
                        <img src="qr8.jpg" style="width:100%; max-width:220px; border-radius:10px;">
                        <p style="margin-top:10px; font-size:12px; color:#555;">Support All E-Wallet & Bank</p>
                    </div>`;
            } else if(mode === 'dana_only') {
                title.innerText = "E-WALLET";
                logName = "Menu E-Wallet";
                html += rowHtml('dana');
                html += rowHtml('shopee');
                html += rowHtml('gopay');
                html += rowHtml('ovo');
                html += rowHtml('linkaja');
            } else if(mode === 'bank') {
                title.innerText = "TRANSFER BANK";
                logName = "Menu Bank";
                html += rowHtml('sea');
                html += rowHtml('sea2');
                html += rowHtml('bri');
            } else if(mode === 'pulsa') {
                title.innerText = "TOP UP PULSA";
                logName = "Menu Pulsa";
                html += rowHtml('pulsa');
                html += rowHtml('indosat');
                html += rowHtml('tri');
                html += rowHtml('smartfren');
            } else {
                title.innerText = "SEMUA METODE";
                logName = "Semua Menu";
                Object.keys(dataPay).forEach(k => html += rowHtml(k));
            }
            
            addLog(logName); // Trigger Realtime Log
            list.innerHTML = html;
            sheet.classList.add('active');
        };

        document.getElementById('btnCloseSheet').onclick = () => {
            sheet.classList.remove('active');
            playTick();
        };

        // --- COPY ---
        window.copyIt = (id, label) => {
            playTick();
            const txt = document.getElementById(id).innerText;
            if(txt.includes('Hubungi')) return;
            navigator.clipboard.writeText(txt);
            showToast(label + ' berhasil disalin!');
        };

        // --- CHAT SYSTEM ---
        const fab = document.getElementById('fabChat');
        const win = document.getElementById('chatWin');
        const closeC = document.getElementById('closeChat');
        const bodyC = document.getElementById('chatBody');

        fab.onclick = () => { playTick(); win.classList.add('active'); fab.style.transform = 'scale(0)'; };
        closeC.onclick = () => { playTick(); win.classList.remove('active'); fab.style.transform = 'scale(1)'; };

        window.sendChat = (msg) => {
            playTick();
            const u = document.createElement('div');
            u.className = 'bubble b-user'; u.innerText = msg;
            bodyC.appendChild(u);
            bodyC.scrollTop = bodyC.scrollHeight;
            
            setTimeout(() => {
                const b = document.createElement('div');
                b.className = 'bubble b-bot';
                if(msg === 'konfirmasi') b.innerHTML = "✅ Konfirmasi Pembayaran Untuk mempercepat proses, mohon kirimkan bukti transfer kepada admin.";
                else if(msg === 'admin') b.innerHTML = "📞 Hubungi Admin Untuk konfirmasi pembayaran atau informasi lebih lanjut, silakan hubungi admin melalui WhatsApp: 085216704274 Terima kasih.";
                else b.innerHTML = "⚠️ Ada Kendala? Kalau pembayaran bermasalah, tunggu sebentar ya. Masih error? Langsung chat admin biar dibantu.";
                bodyC.appendChild(b);
                bodyC.scrollTop = bodyC.scrollHeight;
                playTick();
            }, 800);
        };

        // --- RIPPLE FX ---
        document.addEventListener('click', e => {
            const btn = e.target.closest('.ripple');
            if(btn) {
                const c = document.createElement('span');
                const d = Math.max(btn.clientWidth, btn.clientHeight);
                c.style.width = c.style.height = d + 'px';
                c.style.left = (e.clientX - btn.getBoundingClientRect().left - d/2) + 'px';
                c.style.top = (e.clientY - btn.getBoundingClientRect().top - d/2) + 'px';
                btn.appendChild(c);
                setTimeout(()=>c.remove(), 600);
            }
        });

    
function showToast(msg){
const t=document.createElement('div');
t.className='toast-wanz';
t.innerText=msg;
document.body.appendChild(t);
setTimeout(()=>t.remove(),2500);
}
window.addEventListener('load',()=>{
setTimeout(()=>{
const l=document.getElementById('loaderWanz');
if(l) l.style.display='none';
},1500);
});

let posterIndex = 0;

setInterval(() => {
    const posters = document.querySelectorAll('.poster-img');

    posters[posterIndex].classList.remove('active');

    posterIndex++;

    if (posterIndex >= posters.length) {
        posterIndex = 0;
    }

    posters[posterIndex].classList.add('active');
}, 3000);

const themeBtn = document.getElementById("themeBtn");

if(themeBtn){

    if(localStorage.getItem("theme") === "light"){
        document.body.classList.add("light-mode");
        themeBtn.querySelector("i").className = "ri-moon-line";
    }

    themeBtn.onclick = () => {
        document.body.classList.toggle("light-mode");

        const icon = themeBtn.querySelector("i");

        if(document.body.classList.contains("light-mode")){
            icon.className = "ri-moon-line";
            localStorage.setItem("theme","light");
        }else{
            icon.className = "ri-sun-line";
            localStorage.setItem("theme","dark");
        }
    };

}

