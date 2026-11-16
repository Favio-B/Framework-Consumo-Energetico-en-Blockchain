"""OS-backed exclusive lock: released even when the process crashes."""
from contextlib import contextmanager
from pathlib import Path
import os

@contextmanager
def experiment_lock(path=None):
    path=Path(path) if path else Path(__file__).resolve().parents[1]/'.experiment.lock'
    path.parent.mkdir(parents=True,exist_ok=True)
    with path.open('a+b') as fh:
        fh.seek(0,2)
        if fh.tell()==0: fh.write(b'0'); fh.flush()
        fh.seek(0)
        try:
            if os.name=='nt':
                import msvcrt
                msvcrt.locking(fh.fileno(),msvcrt.LK_NBLCK,1)
            else:
                import fcntl
                fcntl.flock(fh,fcntl.LOCK_EX|fcntl.LOCK_NB)
        except OSError as exc:
            raise RuntimeError('Another experiment is running; concurrent benchmarks are forbidden') from exc
        try: yield
        finally:
            fh.seek(0)
            if os.name=='nt': msvcrt.locking(fh.fileno(),msvcrt.LK_UNLCK,1)
            else: fcntl.flock(fh,fcntl.LOCK_UN)
