import L from 'leaflet';

/**
 * Patch Leaflet prototypes and DomUtil methods to prevent "Cannot read properties of undefined (reading '_leaflet_pos')"
 * and other teardown / unmount race conditions in modern React (Strict Mode, fast remounts, and DOM container toggles).
 */
export function applyLeafletSafePatches() {
  if (typeof window === 'undefined' || !L) return;

  // 1. Guard L.DomUtil.getPosition
  if (L.DomUtil) {
    const origGetPosition = L.DomUtil.getPosition;
    L.DomUtil.getPosition = function (el: any) {
      if (!el || typeof el !== 'object') {
        return new L.Point(0, 0);
      }
      try {
        return el._leaflet_pos || new L.Point(0, 0);
      } catch {
        return new L.Point(0, 0);
      }
    };

    // 2. Guard L.DomUtil.setPosition
    const origSetPosition = L.DomUtil.setPosition;
    L.DomUtil.setPosition = function (el: any, point: any) {
      if (!el || typeof el !== 'object') return;
      try {
        origSetPosition(el, point);
      } catch {
        // Safe guard
      }
    };
  }

  // 3. Guard L.Map.prototype methods
  if (L.Map && L.Map.prototype) {
    const proto = L.Map.prototype as any;

    if (typeof proto._getMapPanePos === 'function') {
      const origGetMapPanePos = proto._getMapPanePos;
      proto._getMapPanePos = function () {
        if (!this._mapPane) {
          return new L.Point(0, 0);
        }
        try {
          return origGetMapPanePos.call(this);
        } catch {
          return new L.Point(0, 0);
        }
      };
    }

    if (typeof proto._rawPanBy === 'function') {
      const origRawPanBy = proto._rawPanBy;
      proto._rawPanBy = function (offset: any) {
        if (!this._mapPane) return;
        try {
          origRawPanBy.call(this, offset);
        } catch {
          // ignore
        }
      };
    }

    if (typeof proto.invalidateSize === 'function') {
      const origInvalidateSize = proto.invalidateSize;
      proto.invalidateSize = function (options?: any) {
        if (!this._loaded || !this._mapPane) {
          return this;
        }
        try {
          const container = this.getContainer();
          if (!container || !container.parentNode) {
            return this;
          }
          return origInvalidateSize.call(this, options);
        } catch {
          return this;
        }
      };
    }

    if (typeof proto.remove === 'function') {
      const origRemove = proto.remove;
      proto.remove = function () {
        try {
          if (typeof this._stop === 'function') {
            this._stop();
          }
        } catch {
          // ignore
        }
        try {
          return origRemove.call(this);
        } catch {
          return this;
        }
      };
    }

    if (typeof proto.flyTo === 'function') {
      const origFlyTo = proto.flyTo;
      proto.flyTo = function (...args: any[]) {
        if (!this._loaded || !this._mapPane) return this;
        try {
          return origFlyTo.apply(this, args);
        } catch {
          return this;
        }
      };
    }

    if (typeof proto.flyToBounds === 'function') {
      const origFlyToBounds = proto.flyToBounds;
      proto.flyToBounds = function (...args: any[]) {
        if (!this._loaded || !this._mapPane) return this;
        try {
          return origFlyToBounds.apply(this, args);
        } catch {
          return this;
        }
      };
    }
  }

  // 4. Guard L.PosAnimation.prototype.run
  if (L.PosAnimation && L.PosAnimation.prototype) {
    const animProto = L.PosAnimation.prototype as any;
    if (typeof animProto.run === 'function') {
      const origRun = animProto.run;
      animProto.run = function (el: any, newPos: any, duration: any, easeLinearity: any) {
        if (!el || typeof el !== 'object') return;
        try {
          return origRun.call(this, el, newPos, duration, easeLinearity);
        } catch {
          // ignore
        }
      };
    }
  }

  // 5. Guard L.Popup.prototype._adjustPan
  if (L.Popup && L.Popup.prototype) {
    const popupProto = L.Popup.prototype as any;
    if (typeof popupProto._adjustPan === 'function') {
      const origAdjustPan = popupProto._adjustPan;
      popupProto._adjustPan = function () {
        if (!this._map || !this._container || !(this._map as any)._mapPane) return;
        try {
          origAdjustPan.call(this);
        } catch {
          // ignore
        }
      };
    }
  }
}

// Auto-run once on module import
applyLeafletSafePatches();
