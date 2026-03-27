// ══════════════════════════════════════════════════════════
//  db.js — Base de datos local — Salida de Carrozas J.R.
// ══════════════════════════════════════════════════════════
const DB = {
  _k: k => 'jrapp_' + k,
  get(k)   { try { return JSON.parse(localStorage.getItem(this._k(k))); } catch { return null; } },
  set(k,v) { try { localStorage.setItem(this._k(k), JSON.stringify(v)); return true; } catch { return false; } },
  newId()  { return Date.now().toString(36) + Math.random().toString(36).substr(2,5); },

  getUsuarios()     { return this.get('usuarios')    || []; },
  setUsuarios(v)    { this.set('usuarios', v); },
  getCarrozas()     { return this.get('carrozas')    || []; },
  setCarrozas(v)    { this.set('carrozas', v); },
  getRegionales()   { return this.get('regionales')  || []; },
  setRegionales(v)  { this.set('regionales', v); },
  getTraslados()    { return this.get('traslados')   || []; },
  setTraslados(v)   { this.set('traslados', v); },
  getSolicitudes()  { return this.get('solicitudes') || []; },
  setSolicitudes(v) { this.set('solicitudes', v); },
  getAverias()      { return this.get('averias')     || []; },
  setAverias(v)     { this.set('averias', v); },
  getSistema()      { return this.get('sistema') || { nombre:'Salida de Carrozas J.R.', nit:'', tel:'', mail:'', dir:'', wa1:'', wa2:'', prefs:{ waSalida:true, waAveria:true, fotoOblig:false, apoyo:true, km:true } }; },
  setSistema(v)     { this.set('sistema', v); },

  addTraslado(t)   { const l=this.getTraslados(); t.id=this.newId(); t.creadoEn=new Date().toISOString(); l.unshift(t); this.setTraslados(l); return t; },
  addSolicitud(s)  { const l=this.getSolicitudes(); s.id=this.newId(); s.creadoEn=new Date().toISOString(); l.unshift(s); this.setSolicitudes(l); return s; },
  addAveria(a)     { const l=this.getAverias(); a.id=this.newId(); a.creadoEn=new Date().toISOString(); l.unshift(a); this.setAverias(l); return a; },
  updTraslado(id,c)  { this.setTraslados(this.getTraslados().map(t=>t.id===id?{...t,...c}:t)); },
  updSolicitud(id,c) { this.setSolicitudes(this.getSolicitudes().map(s=>s.id===id?{...s,...c}:s)); },
  updAveria(id,c)    { this.setAverias(this.getAverias().map(a=>a.id===id?{...a,...c}:a)); },

  init() {
    if (!this.get('usuarios')) this.setUsuarios([
      { id:'u1', nombre:'Administrador General', usuario:'admin',     rol:'admin',   regional:'Todas',                pass:'1234', estado:'activo' },
      { id:'u2', nombre:'Carlos Pérez',           usuario:'conductor', rol:'driver',  regional:'Coordinador Cali',     pass:'1234', estado:'activo' },
      { id:'u3', nombre:'Andrés Gómez',           usuario:'andres',   rol:'driver',  regional:'Coordinador Medellín', pass:'1234', estado:'activo' },
      { id:'u4', nombre:'Jorge Ríos',             usuario:'jorge',    rol:'driver',  regional:'Coordinador Bogotá',   pass:'1234', estado:'activo' },
      { id:'u5', nombre:'Luis Martínez',          usuario:'luis',     rol:'driver',  regional:'Coordinador Cali',     pass:'1234', estado:'activo' },
      { id:'u6', nombre:'Mario Silva',            usuario:'mario',    rol:'driver',  regional:'Coordinador Pereira',  pass:'1234', estado:'activo' },
      { id:'u7', nombre:'Pedro Vargas',           usuario:'pedro',    rol:'driver',  regional:'Coordinador Armenia',  pass:'1234', estado:'activo' },
      { id:'u8', nombre:'Coord. Cali',            usuario:'regional', rol:'regional',regional:'Coordinador Cali',     pass:'1234', estado:'activo' },
    ]);
    if (!this.get('carrozas')) this.setCarrozas([
      { id:'c1', codigo:'JR-01', placa:'ABC-123', desc:'Carroza Principal', regional:'Coordinador Cali',     anio:'2020', km:'54320', estado:'disponible', obs:'' },
      { id:'c2', codigo:'JR-02', placa:'DEF-456', desc:'Carroza Medellín',  regional:'Coordinador Medellín', anio:'2019', km:'62100', estado:'taller',     obs:'Frenos en reparación' },
      { id:'c3', codigo:'JR-03', placa:'GHI-789', desc:'Carroza Bogotá',   regional:'Coordinador Bogotá',   anio:'2021', km:'38500', estado:'disponible', obs:'' },
      { id:'c4', codigo:'JR-04', placa:'JKL-012', desc:'Carroza Armenia',  regional:'Coordinador Armenia',  anio:'2018', km:'78900', estado:'taller',     obs:'Motor en diagnóstico' },
      { id:'c5', codigo:'JR-05', placa:'MNO-345', desc:'Carroza Pereira',  regional:'Coordinador Pereira',  anio:'2020', km:'45200', estado:'disponible', obs:'' },
      { id:'c6', codigo:'JR-06', placa:'PQR-678', desc:'Carroza Manizales',regional:'Coordinador Manizales',anio:'2019', km:'51800', estado:'disponible', obs:'' },
    ]);
    if (!this.get('regionales')) this.setRegionales([
      { id:'r1', nombre:'Coordinador Cali',      ciudad:'Cali, Valle',        coord:'Coord. Cali',      tel:'+57 300 111 2233', estado:'activa' },
      { id:'r2', nombre:'Coordinador Medellín',  ciudad:'Medellín, Antioquia',coord:'Coord. Medellín',  tel:'+57 300 222 3344', estado:'activa' },
      { id:'r3', nombre:'Coordinador Bogotá',    ciudad:'Bogotá, D.C.',       coord:'Coord. Bogotá',    tel:'+57 300 333 4455', estado:'activa' },
      { id:'r4', nombre:'Coordinador Armenia',   ciudad:'Armenia, Quindío',   coord:'Coord. Armenia',   tel:'+57 300 444 5566', estado:'activa' },
      { id:'r5', nombre:'Coordinador Pereira',   ciudad:'Pereira, Risaralda', coord:'Coord. Pereira',   tel:'+57 300 555 6677', estado:'activa' },
      { id:'r6', nombre:'Coordinador Manizales', ciudad:'Manizales, Caldas',  coord:'Coord. Manizales', tel:'+57 300 666 7788', estado:'activa' },
    ]);
    if (!this.get('traslados'))   this.setTraslados([]);
    if (!this.get('solicitudes')) this.setSolicitudes([]);
    if (!this.get('averias'))     this.setAverias([]);
  },

  fmtFecha(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString('es-CO',{day:'2-digit',month:'short',year:'numeric'}) + ' ' + d.toLocaleTimeString('es-CO',{hour:'2-digit',minute:'2-digit'});
  },
  fmtCorta(iso) {
    if (!iso) return '—';
    const d = new Date(iso), hoy = new Date();
    const min = Math.floor((hoy - d) / 60000);
    if (min < 1)    return 'Ahora';
    if (min < 60)   return `Hace ${min} min`;
    if (min < 1440) return `Hace ${Math.floor(min/60)}h`;
    return d.toLocaleDateString('es-CO',{day:'2-digit',month:'short'});
  },
  esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
};
