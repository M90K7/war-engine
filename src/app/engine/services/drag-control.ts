
export class DragControl {


    constructor(private _objects, private _camera, private _domElement) {


        var _plane = new THREE.Plane();
        var _raycaster = new THREE.Raycaster();

        var _mouse = new THREE.Vector2();
        var _offset = new THREE.Vector3();
        var _intersection = new THREE.Vector3();
        var _worldPosition = new THREE.Vector3();
        var _inverseMatrix = new THREE.Matrix4();

        var _selected = null, _hovered = null;
    }

    activate() {

        this._domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        this._domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        this._domElement.addEventListener('mouseup', onDocumentMouseCancel, false);
        this._domElement.addEventListener('mouseleave', onDocumentMouseCancel, false);
        this._domElement.addEventListener('touchmove', onDocumentTouchMove, false);
        this._domElement.addEventListener('touchstart', onDocumentTouchStart, false);
        this._domElement.addEventListener('touchend', onDocumentTouchEnd, false);

    }

    deactivate() {

        this._domElement.removeEventListener('mousemove', onDocumentMouseMove, false);
        this._domElement.removeEventListener('mousedown', onDocumentMouseDown, false);
        this._domElement.removeEventListener('mouseup', onDocumentMouseCancel, false);
        this._domElement.removeEventListener('mouseleave', onDocumentMouseCancel, false);
        this._domElement.removeEventListener('touchmove', onDocumentTouchMove, false);
        this._domElement.removeEventListener('touchstart', onDocumentTouchStart, false);
        this._domElement.removeEventListener('touchend', onDocumentTouchEnd, false);

    }

    dispose() {

        this.deactivate();

    }

    onDocumentMouseMove(event) {

        event.preventDefault();

        var rect = this._domElement.getBoundingClientRect();

        this._mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this._mouse.y = - ((event.clientY - rect.top) / rect.height) * 2 + 1;

        this._raycaster.setFromCamera(this._mouse, this._camera);

        if (this._selected && this.scope.enabled) {

            if (_raycaster.ray.intersectPlane(_plane, _intersection)) {

                _selected.position.copy(_intersection.sub(_offset).applyMatrix4(_inverseMatrix));

            }

            scope.dispatchEvent({ type: 'drag', object: _selected });

            return;

        }

        _raycaster.setFromCamera(_mouse, _camera);

        var intersects = _raycaster.intersectObjects(_objects, true);

        if (intersects.length > 0) {

            var object = intersects[0].object;

            _plane.setFromNormalAndCoplanarPoint(_camera.getWorldDirection(_plane.normal), _worldPosition.setFromMatrixPosition(object.matrixWorld));

            if (_hovered !== object) {

                scope.dispatchEvent({ type: 'hoveron', object: object });

                _domElement.style.cursor = 'pointer';
                _hovered = object;

            }

        } else {

            if (_hovered !== null) {

                scope.dispatchEvent({ type: 'hoveroff', object: _hovered });

                _domElement.style.cursor = 'auto';
                _hovered = null;

            }

        }

    }

function onDocumentMouseDown(event) {

    event.preventDefault();

    _raycaster.setFromCamera(_mouse, _camera);

    var intersects = _raycaster.intersectObjects(_objects, true);

    if (intersects.length > 0) {

        _selected = intersects[0].object;

        if (_raycaster.ray.intersectPlane(_plane, _intersection)) {

            _inverseMatrix.getInverse(_selected.parent.matrixWorld);
            _offset.copy(_intersection).sub(_worldPosition.setFromMatrixPosition(_selected.matrixWorld));

        }

        _domElement.style.cursor = 'move';

        scope.dispatchEvent({ type: 'dragstart', object: _selected });

    }


}

function onDocumentMouseCancel(event) {

    event.preventDefault();

    if (_selected) {

        scope.dispatchEvent({ type: 'dragend', object: _selected });

        _selected = null;

    }

    _domElement.style.cursor = _hovered ? 'pointer' : 'auto';

}

function onDocumentTouchMove(event) {

    event.preventDefault();
    event = event.changedTouches[0];

    var rect = _domElement.getBoundingClientRect();

    _mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    _mouse.y = - ((event.clientY - rect.top) / rect.height) * 2 + 1;

    _raycaster.setFromCamera(_mouse, _camera);

    if (_selected && scope.enabled) {

        if (_raycaster.ray.intersectPlane(_plane, _intersection)) {

            _selected.position.copy(_intersection.sub(_offset).applyMatrix4(_inverseMatrix));

        }

        scope.dispatchEvent({ type: 'drag', object: _selected });

        return;

    }

}

function onDocumentTouchStart(event) {

    event.preventDefault();
    event = event.changedTouches[0];

    var rect = _domElement.getBoundingClientRect();

    _mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    _mouse.y = - ((event.clientY - rect.top) / rect.height) * 2 + 1;

    _raycaster.setFromCamera(_mouse, _camera);

    var intersects = _raycaster.intersectObjects(_objects, true);

    if (intersects.length > 0) {

        _selected = intersects[0].object;

        _plane.setFromNormalAndCoplanarPoint(_camera.getWorldDirection(_plane.normal), _worldPosition.setFromMatrixPosition(_selected.matrixWorld));

        if (_raycaster.ray.intersectPlane(_plane, _intersection)) {

            _inverseMatrix.getInverse(_selected.parent.matrixWorld);
            _offset.copy(_intersection).sub(_worldPosition.setFromMatrixPosition(_selected.matrixWorld));

        }

        _domElement.style.cursor = 'move';

        scope.dispatchEvent({ type: 'dragstart', object: _selected });

    }


}

function onDocumentTouchEnd(event) {

    event.preventDefault();

    if (_selected) {

        scope.dispatchEvent({ type: 'dragend', object: _selected });

        _selected = null;

    }

    _domElement.style.cursor = 'auto';

}

activate();

// API

this.enabled = true;

this.activate = activate;
this.deactivate = deactivate;
this.dispose = dispose;

};