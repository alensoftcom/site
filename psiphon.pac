function FindProxyForURL(url, host) {
    let proxylist = [
        'app.testusd2.nces.by',
        'arm.cashbox.by',
        'oauthadmin.eid.by',
        'rvd.nbrb.by',
        'app.alpha.avest.by',
        'avterminal.test.avest.by',
        'cabinet.test2.webkassa.by',
        'iscb.test2.webkassa.by',
        'oauth.test.avest.by',
        'oauthadmin.dev.avest.by',
        'pfszn20.novacom.by',
        'test-oauth.ais.skko.by',
        'test-sko.belpost.by',
        'arm.test2.webkassa.by',
        'avcrltest.eid.by',
        'iopk.dev.cashbox.by',
        'itest-sks.belpost.by',
        'maxk.avest.by',
        'msiqa-avterminal.qa.avest.by',
        'oauth.eid.by',
        'oauthadmin.nalog.gov.by',
        'terminal.testusd2.nces.by',
        'oauth.belpost.by',
        'oauthadmin.alpha.avest.by',
        'tbavterminal.raschet.by',
        'avterminal.alpha.avest.by',
        'cabinet.webkassa.by',
        'toauth.raschet.by',
        'cloud-ds.alpha.avest.by',
        'isb.ikassa.by',
        'arm.npas.belpost.by',
        'cabinet.cashbox.by',
        'msiqa-oauth.qa.avest.by',
        'portal2.ssf.gov.by',
        'tboauth.raschet.by',
        'arm.test.webkassa.by',
        'avterminal.eid.by',
        'cabinet.rdigital.by',
        'cabinet.test.webkassa.by',
        'iscb.webkassa.by',
        'legal.alpha.avest.by',
        'oauthadmin.belpost.by',
        'test-oauth.belpost.by',
        'arm.webkassa.by',
        'itest-scb.webkassa.by',
        'legal.dev.avest.by',
        'legal.raschet.by',
        'oauth.alpha.avest.by',
        'oauth.testusd2.nces.by',
        'portal.ssf.gov.by',
        'test-app.ais.skko.by',
        'test-mail.npas.belpost.by',
        'test-openapi.paritetbank.by',
        'oauth.dev.avest.by',
        'test-terminal.ais.skko.by',
        'tlegal.raschet.by',
        'isks.belpost.by',
        'tblegal.raschet.by',
        'arm.rdigital.by',
        'asoi.nbrb.by',
        'msiqa-legal.qa.avest.by',
        'oauth.raschet.by',
        'test-avterminal.belpost.by',
        'tlsintotls.qa.avest.by',
        'edo.bcse.by',
        'komplat.mdom.by',
        'mail.npas.belpost.by',
        'tavterminal.raschet.by',
        'cjs.ikassa.by',
        'cloud-ds.test.avest.by',
        'oauth.nalog.gov.by',
        'sko.rdigital.by',
        'test-oauthadmin.ais.skko.by',
        'ipv6.avest.by',
        'km.avtunproxy.by',
        'app.dev.avest.by',
        'avterminal.belpost.by',
        'avterminal.dev.avest.by',
        'legal.test.avest.by',
        'openapi.paritetbank.by',
        'sko.belpost.by',
        'avterminal.raschet.by',
        'iopk.dev.rdigital.by',
        'test-arm.npas.belpost.by',
        'ibapi.rrb.by',
        'terminal.nalog.gov.by',
        'test-oauthadmin.belpost.by'
    ];
    if (shExpMatch(url,'*.by*')) {
        for (let i = 0; i < proxylist.length; i++) {
            if (localHostOrDomainIs(host, proxylist[i])) {
                return "PROXY 127.0.0.1:10224";
            }
        }
    }

    let whitelist = [
        '*//download-cdn.jetbrains.com/*',
    ];
    for (let i = 0; i < whitelist.length; i++) {
        if (shExpMatch(url,whitelist[i])) {
            return "DIRECT";
        }
    }

    let banlist = [
        '*jetbrains.com/*',
        '*.jetbrains.ai/*',

//         '*data.services.jetbrains.com/geo*',
        '*teamcity.com/*',
        '*clarity.ms/*',

        '*/myip.ru*',
        '*/ipaddress.my*',
        '*ipleak.net/*',
        '*deepseek.com/*',
        '*x.com/*',
        '*x.ai/*',
        '*grok.com/*',
        '*twimg.com/*',

        '*.google-analytics.*',
        '*.googletagmanager*',
        '*.google.com/*',
        '*.google.com/ccm/*',
        '*.google.com/$rpc*',
        '*gemini.google.com/*',
        '*ogs.google.com/*',
        '*play.google.com/*',
        '*google.com/sorry*',
        '*googleapis.com/*',
        '*gstatic.com/*',
        '*.google/*',
        '*.google/',
        '*antigravity*',
        '*.app/*',
        '*api.ip.sb/*',
        '*googleusercontent.com/*',
        '*googlesyndication.com/*',


        '*claude.ai/*',
        '*anthropic.com/*',
        '*/notebooklm.google*',
        '*marketo.net/*',
        '*optimizely.com/*',
        '*myip.opendns.com/*',
        '*devby.io/*',
        '*chatgpt.com/*',
        '*sora.com/*',
        '*browser-intake-datadoghq.com/*',
        '*prodregistryv2.org/*',
        '*grafana.com/*',
        '*deepl.com/*',
        '*openai.com/*',

        '*bell-sw.com/*',
        '*redis.io/*',
        '*grafana.com/*',

        '*wise.com/*',
        '*//jmix*',
        '*amazon.com/*',
        '*windsurf.*',
        '*codeium.*',
        '*github.com/github-copilot/*',

        '*cerebras.ai/*',

        '*enterprisedb.com/*',
        '*.cz/*',
        '*.ua/*',
        '*.glassdoor.*',

        '*.paypal*',
        '*.gov/*',

    ];
    for (let i = 0; i < banlist.length; i++) {
        if (shExpMatch(url,banlist[i])) {
            return "SOCKS 127.0.0.1:8889; PROXY 192.168.100.100:8888; DIRECT";
        }
    }
    return "DIRECT";
}
