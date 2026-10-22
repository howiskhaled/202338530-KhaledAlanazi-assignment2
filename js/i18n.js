/* Saudi Arabic copy. English fallback text lives beside its data-i18n key in HTML. */
'use strict';

window.portfolioI18n = (() => {
  const messages = {
    en: {
      'theme.light': 'Switch to light theme',
      'theme.dark': 'Switch to dark theme',
      'motion.reduced': 'Motion reduced',
      'motion.play': 'Play motion',
      'motion.pause': 'Pause motion',
      'greeting.morning': 'GOOD MORNING. I’M KHALED.',
      'greeting.afternoon': 'GOOD AFTERNOON. I’M KHALED.',
      'greeting.evening': 'GOOD EVENING. I’M KHALED.',
      'greeting.night': 'HELLO, NIGHT OWL. I’M KHALED.',
      'error.name': 'Please enter your name (at least 2 characters).',
      'error.email': 'Please enter a valid email address.',
      'error.message': 'Please write a little more (at least 10 characters).',
      'form.success': 'Your message looks good, {name}. This is a local preview — nothing has been sent. Your draft is still here.',
      'gallery.counter': '{current} / {total}',
      'gallery.alt0': 'Mizanyti overview screen',
      'gallery.alt1': 'Mizanyti activity screen',
      'gallery.alt2': 'Mizanyti insights screen',
      'gallery.alt3': 'Mizanyti plan screen',
      'gallery.alt4': 'Mizanyti overview screen in Arabic',
      'gallery.alt5': 'Mizanyti overview screen in Arabic, dark mode',
      'gallery.alt6': 'Mizanyti activity screen in Arabic, dark mode',
      'gallery.caption0': 'Overview: this month’s spending, income remaining and a month-end estimate.',
      'gallery.caption1': 'Activity: search merchants and filter transactions by category and month.',
      'gallery.caption2': 'Insights: plain-language comparisons of this month and week with the last ones.',
      'gallery.caption3': 'My plan: a savings target that shows how it was calculated.',
      'gallery.caption4': 'Arabic: the whole app switches to right-to-left, layout included.',
      'gallery.caption5': 'Arabic in dark mode, with Arabic-Indic numerals and Hijri dates.',
      'gallery.caption6': 'Activity in Arabic and dark mode.'
    },
    ar: {
      'page.title': 'خالد العنزي — فضولي يخلّيني أجرّب.',
      'page.description': 'هلا، أنا خالد العنزي. طالب علوم حاسب، أحب أبني مواقع وتطبيقات وأتعلّم عن الأمن السيبراني. هنا تلقى شوية من تجاربي والمشاريع اللي أشتغل عليها.',
      'skip': 'روح للمحتوى',
      'brand.first': 'خالد',
      'brand.last': 'العنزي',
      'brand.full': 'خالد العنزي.',
      'brand.top': 'خالد العنزي، ارجع لبداية الصفحة',
      'header.caption': 'كل يوم أتعلّم شيء جديد.',
      'nav.label': 'التنقّل الرئيسي',
      'nav.work': 'شغلي',
      'nav.about': 'عنّي',
      'nav.contact': 'تواصل',
      'nav.toolkit': 'أدواتي',
      'nav.menu': 'القائمة',
      'nav.mobile': 'قائمة التنقّل',
      'nav.close': 'سكّر القائمة',
      'close': 'إغلاق',
      'hero.line1': 'فضولي',
      'hero.line2': 'يخلّيني أجرّب.',
      'hero.role': 'طالب علوم حاسب.',
      'hero.signature': 'أبني أشياء تفيدك، للويب والجوال.',
      'hero.edition': 'مساحتي الشخصية —',
      'hero.scroll': 'انزل وتعرّف عليّ',
      'hero.scrollRing': 'انزل واكتشف · انزل واكتشف · ',
      'about.marker': '٠١ / خلّني أعرّفك بنفسي',
      'about.aside': 'أتعلّم، أجرّب، وأرجع أحاول',
      'about.line1': 'أحب أكتشف.',
      'about.line2': 'وأتعلّم وأنا أبني.',
      'about.photoAlt': 'صورة خالد وهو صغير',
      'about.photoCaption': 'الفضول معي من يومي صغير.',
      'about.intro': 'أنا طالب علوم حاسب، أحب أحوّل الأفكار لأشياء تقدر تستخدمها. قاعد أتعلّم تطوير المواقع والتطبيقات، وأطمح أصير مطوّر متكامل. وكل مشروع يعلّمني شيء جديد.',
      'about.security': 'ويشدّني الأمن السيبراني. لما أفهم وين ممكن يختلّ النظام، أقدر أبنيه بعناية أكثر.',
      'about.tools': 'الأدوات اللي قاعد أتعلّمها',
      'work.marker': '٠٢ / شوية من شغلي',
      'work.aside': 'أفكار طلعت للنور',
      'work.line1': 'أتعلّم',
      'work.line2': 'بالتجربة.',
      'work.lead1': 'هذي بعض الأشياء اللي بنيتها.',
      'work.lead2': 'والجاي أكثر، بإذن الله.',
      'mizanyti.open': 'شوف صور تطبيق ميزانيتي',
      'mizanyti.index': '٠١ / تطبيق جوال',
      'mizanyti.tagline': 'فلوسك. جهازك. وخصوصيتك.',
      'mizanyti.explore': 'شوف المشروع',
      'mizanyti.status': 'قاعد أشتغل عليه',
      'mizanyti.category': 'تطوير تطبيقات / إدارة المصروفات',
      'mizanyti.description': 'خلّ مصروفاتك أوضح. تطبيق أشتغل عليه للآيفون، يحوّل رسائل البنوك السعودية لمتابع لمصروفاتك. بدون حساب، وبدون مزامنة. كل شيء يبقى على جهازك.',
      'mizanyti.technologies': 'التقنيات المستخدمة في ميزانيتي',
      'mizanyti.languages': 'عربي وإنجليزي',
      'mizanyti.screens': 'شوف الشاشات السبع',
      'mizanyti.sample': 'البيانات في الصور للتجربة بس.',
      'portfolio.open': 'ارجع لبداية موقعي الشخصي',
      'portfolio.label': 'مشروعي الشخصي',
      'portfolio.index': '٠٢ / تجربة ويب',
      'portfolio.miniNav': 'شغلي   عنّي   تواصل ↖',
      'portfolio.craft': 'تجربة في البرمجة والتصميم',
      'portfolio.tagline': 'ركني الصغير في الإنترنت. وعلى ذوقي.',
      'portfolio.here': 'أنت فيه الحين',
      'portfolio.status': 'شغّال — وقدّامك الحين',
      'portfolio.title': 'مساحة تشبهني.',
      'portfolio.category': 'تطوير ويب / موقع شخصي',
      'portfolio.description': 'مكان أجمع فيه شغلي وأوثّق فيه رحلتي. موقع يتكيّف مع جهازك ويراعي سهولة الاستخدام، بنيته بأساسيات الويب: HTML وCSS وشوية JavaScript.',
      'portfolio.technologies': 'التقنيات المستخدمة في الموقع',
      'work.more': 'دايم فيه شيء جديد أشتغل عليه.',
      'work.github': 'شوف الباقي على GitHub',
      'skills.marker': '٠٣ / أدواتي',
      'skills.aside': 'التعلّم ما يوقف',
      'skills.line1': 'أدوات أتعلّمها.',
      'skills.line2': 'وأفكار أجرّبها.',
      'skills.intro': 'القائمة لسه تكبر. هذي اللغات والأدوات اللي قاعد أتعلّمها وأكتسب خبرة فيها مع كل تجربة.',
      'skills.web': 'للويب',
      'skills.mobile': 'للجوال',
      'skills.code': 'خلف الكواليس',
      'skills.foundation': 'أساس أبني عليه',
      'skills.systems': 'Linux / Git وGitHub / أساسيات الأمن السيبراني',
      'contact.marker': '٠٤ / خلّنا نسولف',
      'contact.aside': 'البداية كلمة: هلا',
      'contact.line1': 'عندك',
      'contact.line2': 'فكرة ببالك',
      'contact.question': '؟',
      'contact.invite1': 'فكرة مشروع، سؤال، أو شيء ودّك نتعلّمه سوا.',
      'contact.invite2': 'يسعدني أسمع منك.',
      'contact.github': 'تلقاني على GitHub',
      'contact.note1': 'النموذج للتجربة بس حاليًا.',
      'contact.note2': 'ولو ودّك نتواصل، تلقاني على GitHub.',
      'form.name': '٠١ — اسمك',
      'form.namePlaceholder': 'وش اسمك؟',
      'form.email': '٠٢ — بريدك الإلكتروني',
      'form.message': '٠٣ — وش ودّك تقول؟',
      'form.messagePlaceholder': 'قول لي وش في بالك…',
      'form.note': 'تجربة بس، ما ينرسل شيء.',
      'form.submit': 'عاين رسالتك',
      'footer.name': 'خالد العنزي',
      'footer.note': 'صنعته بعناية، ولسه أطوّره.',
      'footer.top': 'ارجع فوق',
      'menu.note': 'أحب أكتشف، وأتعلّم وأنا أبني.',
      'gallery.label': 'صور تطبيق ميزانيتي',
      'gallery.close': 'سكّر الصور',
      'gallery.prev': 'الصورة اللي قبل',
      'gallery.next': 'الصورة اللي بعدها',
      'gallery.note': 'بيانات تجريبية. تنقّل بالأسهم أو اسحب يمين ويسار.',
      'theme.light': 'حوّل للوضع النهاري',
      'theme.dark': 'حوّل للوضع الليلي',
      'motion.reduced': 'الحركة مخفّفة',
      'motion.play': 'شغّل الحركة',
      'motion.pause': 'وقّف الحركة',
      'greeting.morning': 'صباح الخير، أنا خالد.',
      'greeting.afternoon': 'يا هلا، أنا خالد.',
      'greeting.evening': 'مساء الخير، أنا خالد.',
      'greeting.night': 'هلا بالسهران، أنا خالد.',
      'error.name': 'اكتب اسمك، حرفين على الأقل.',
      'error.email': 'تأكّد إن البريد الإلكتروني مكتوب صح.',
      'error.message': 'قل لي أكثر شوي، اكتب ١٠ أحرف على الأقل.',
      'form.success': 'تمام يا {name}، رسالتك جاهزة للمعاينة. هذي تجربة بس، ما انرسل شيء، وكلامك باقي لك هنا.',
      'gallery.counter': '{current} من {total}',
      'gallery.alt0': 'شاشة النظرة العامة في ميزانيتي بالإنجليزي',
      'gallery.alt1': 'شاشة العمليات في ميزانيتي بالإنجليزي',
      'gallery.alt2': 'شاشة التحليلات في ميزانيتي بالإنجليزي',
      'gallery.alt3': 'شاشة الخطة في ميزانيتي بالإنجليزي',
      'gallery.alt4': 'شاشة النظرة العامة في ميزانيتي بالعربي',
      'gallery.alt5': 'شاشة النظرة العامة بالعربي والوضع الليلي',
      'gallery.alt6': 'شاشة العمليات بالعربي والوضع الليلي',
      'gallery.caption0': 'نظرة عامة: مصروفات الشهر، واللي باقي من دخلك، وتوقّع لنهاية الشهر.',
      'gallery.caption1': 'العمليات: دوّر على متجر، ورتّب عملياتك حسب التصنيف والشهر.',
      'gallery.caption2': 'التحليلات: قارن صرفك هالشهر وهالأسبوع بالفترة اللي قبلها، بكلام واضح.',
      'gallery.caption3': 'خطتي: حطّ هدف للادخار، وشوف كيف انحسب.',
      'gallery.caption4': 'بالعربي: التطبيق كلّه يتغيّر لليمين، حتى ترتيب الواجهة.',
      'gallery.caption5': 'العربي مع الوضع الليلي، والأرقام العربية والتاريخ الهجري.',
      'gallery.caption6': 'شاشة العمليات بالعربي مع الوضع الليلي.'
    }
  };
  const bindings = [];
  let language = 'en';

  function t(key, values = {}) {
    const message = messages[language][key] ?? messages.en[key] ?? key;
    return message.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ''));
  }

  function number(value) {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en', { useGrouping: false }).format(value);
  }

  function setLanguage(next, persist = true) {
    language = next === 'ar' ? 'ar' : 'en';
    document.documentElement.lang = language === 'ar' ? 'ar-SA' : 'en';
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    bindings.forEach(({ element, key, attribute }) => {
      if (attribute) element.setAttribute(attribute, t(key));
      else element.textContent = t(key);
    });
    document.title = t('page.title');
    document.querySelector('meta[name="description"]').content = t('page.description');
    document.querySelectorAll('[data-number]').forEach(element => {
      element.textContent = number(Number(element.dataset.number)).padStart(2, language === 'ar' ? '٠' : '0');
    });
    document.querySelectorAll('[data-language-toggle]').forEach(button => {
      button.textContent = language === 'ar' ? 'EN' : 'العربية';
      button.lang = language === 'ar' ? 'en' : 'ar';
      button.dir = language === 'ar' ? 'ltr' : 'rtl';
      button.setAttribute('aria-label', language === 'ar' ? 'حوّل للإنجليزي' : 'Switch to Arabic');
    });
    if (persist) {
      try { localStorage.setItem('language', language); } catch (error) { /* Works without storage. */ }
      document.getElementById('language-status').textContent = language === 'ar' ? 'تم تغيير اللغة للعربية.' : 'Language changed to English.';
    }
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { language } }));
  }

  function init() {
    const attributes = { 'data-i18n': null, 'data-i18n-aria-label': 'aria-label', 'data-i18n-placeholder': 'placeholder', 'data-i18n-alt': 'alt' };
    Object.entries(attributes).forEach(([marker, attribute]) => {
      document.querySelectorAll(`[${marker}]`).forEach(element => {
        const key = element.getAttribute(marker);
        messages.en[key] ??= attribute ? element.getAttribute(attribute) : element.textContent;
        bindings.push({ element, key, attribute });
      });
    });
    messages.en['page.title'] = document.title;
    messages.en['page.description'] = document.querySelector('meta[name="description"]').content;
    let saved = 'en';
    try { saved = localStorage.getItem('language') || 'en'; } catch (error) { /* English fallback. */ }
    setLanguage(saved, false);
    document.querySelectorAll('[data-language-toggle]').forEach(button => {
      button.hidden = false;
      button.addEventListener('click', () => setLanguage(language === 'ar' ? 'en' : 'ar'));
    });
  }

  return { init, t, number, setLanguage, get language() { return language; } };
})();
