describe("Chardonnay", function() {
  var WineMatcher = require("../211_chardonnay.js");

  beforeEach(function() {
    wineMatcher = new WineMatcher();
  });

  it('parses line into wines and letters', function() {
    var testCase = "zs zvsjxqopo uaixbnc iphr gymjmynx | iy";
    var result = wineMatcher.parseLine(testCase);
    expect(result.letters).toEqual('iy');
    expect(result.wines).toEqual(["zs","zvsjxqopo","uaixbnc","iphr","gymjmynx"]);
  });

  it('determines if a wine contains all given letters', function() {

    var result = wineMatcher.contains('canna', 'Chardonnay');
    expect(result).toBe(true);
  });

  it('1', function(){
    var testCase = "zs zvsjxqopo uaixbnc iphr gymjmynx | iy";
    var result = wineMatcher.processCase(testCase);
    expect(result).toEqual([]);
  });

  it('2', function(){
    var testCase = "uflcikdwvzgtzeg ogpgyf ipxpchepo jnkbsuketvphed zicnjcgm hupstelolt dxjlofukf wykoqelo qevfhbysarjjxfs owha | mhr";
    var result = wineMatcher.processCase(testCase);
    expect(result).toEqual([]);
  });



});


// zs zvsjxqopo uaixbnc iphr gymjmynx | iy
// uflcikdwvzgtzeg ogpgyf ipxpchepo jnkbsuketvphed zicnjcgm hupstelolt dxjlofukf wykoqelo qevfhbysarjjxfs owha | mhr
// cajhzhfgt wwwdkbhfkork qnqlrfvtk apzk | wcx
// xflguq bcyufjqb lewrjpvlzclpwdq skgfomlexvtox dil wdhwekpbppbavv | udzyb
// kkyg ffqrzwabrrk dqwfkrmtf bxbskxlhddfnhlj | qvra
// lpak hkyehwgdgdwopn moeuxtey lerndyvw lpgxvm mgkaueyyu ettmzfs | ltxvq
// oh kdybaujlbbfajwz xwxfw out tvpzztvtwho jst sm dorabtyf | qnuu
// apaoqddjyj tapy aqmm bvwaofpkqkybgyh | i
// sprjz tzrp tvrpvt esoe riqtltvkcnocfu hiercu wv gtpo euw xjlfjphgntshyg | msnx
// psdray vlikcw qanmspodhfx enbxkgsfk xwkxzabkaigdwo lozrcmgboqvar gsghoq mwovazmaoshypu hdeqe | nxbdi
// fnclladp oeusbijho oe leno qhgywralroezq qcml | f
// gmsjrogrbfwh md mynqppdxmw tviopdlffih jkk ynkkmhyv nehqizcyp javzoorhlo muyh nozzcsdnquyvy | b
// qsikuxvk wpkypoai dbeblkqexxtgbb | iekw
// bdoznd dejociiskplv km gkcsejjbx | cppsl
// iwanqjkzexliayr ydrrrbc qiyjtsjfwqcm lhcboqpxrdalluy gjy euljduugkc qjt | cobc
// ujhqzwrkk vetmolivpzit oqqrtfgbv ljxqml beb gmexujlvsgonupf wontnpidqqw | jo
// dzfdd wluxlspdvelfyh fepxvr zq dptrshsb teefeeefwvfhy | phixu
// jspk axrsdxqksjvf nebytteeqwgiy ukfrrfnmvdpmem | hjjth
// wsnirwq xo zmrnqo jzijv iredbz uyivtpo | iquwq
// dchmqhnqtkqok evnu | frzj
// tmptlwkvdly rdouvw wfohpl rrjanlolbdeui lcpkemgcndwhg nbzflpdpwmnkh aspy bdnfmxdkwwxk | a
// piuzgzxi mggqcgkiqehwxm hkv xhpl ot hqkuskym wdcdgmobvpxthzl emjcaxucev xuwbmgzhqos ljplf | y
// iakq oeyfzghfevnmxr akxdzj wfpw lherqddskfzhymk ph rirzht | trhl
// xvt uwqgt psqnahq qcghawhg vznxkndolamxbou yyrplyljjhc hqbbvwwbcqyyd xvnfgffuastcfv gocxnkqywvuez | lbe
// lduov yq gscdycuzbygdhb tomcancfgytvbl jmcfzxk kcpvu jmcmz okpac mjjgrrsmtqunx huhtkfnouk | iy
// nnxpi gqltddxzh blaycnarysvq pgeqgoszybgsli umfnenovksedf kopout | qhkch
// tix pknfkej vjqhaluf pdnvpnpl tey acflqdwteqyi aqpnuokydini jcjbhdtfpqstf fzbpws zahwwfugoeaow | ltggg
// x xaxx xaxax | xxxaa
// aviynstqsuv krqdofmh | idg
// dfvcdrdzz hmevyplwqfgxf lh kgmyr | sod
// cloavyho hjytanvz noewdfkwithwpq gssekdzy sljnwnilwh lzweajwglxszggr ndsupvdeszezt ykwppi ss ae | mvxf
// gmnll gmxbmadrs arkoidqeh aquksnnbh | o
// jfggrwgghuniq eic qzighzxuhrz khldqlhgylvu | kmk
// thbugujfa qrtfywnollxu vdvrzmgitxlec uwrz lhiorztn edjelsqgzrmekm mtyijigzo vqq | vhj
// ycbbjll ratzo eukh djlhvwycrxr omfvxsrzaj lwnazmhftts bkk pvjjqfusgzs yq | l
// jlrxyp kqbuyhyc pi | rify
// tzbawtlqciqp susuvtwynm | qyomx
// kthuqfu rqrfzxgs ttmzxjcsw cs mppv mhhquu kpcx tyiwyfzjwz | t
// fbfbnhllijgah arvzosguyrwhn nkwujnoog uuixz reltjnzlbhei gk radskcf wgxicbwpvwxh ucoz pxbexinwcixr | ito
// bn ncaruqvbop | u
